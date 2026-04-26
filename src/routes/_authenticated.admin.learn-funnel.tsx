/**
 * Admin-only Learn funnel dashboard.
 *
 * Visualises drop-off through each step of the Learn flow + per-concept
 * stuck points. Restricted via `useIsAdmin` (server-side enforcement comes
 * from the user_roles table's RLS — non-admins will see empty rows because
 * the SELECT policy hides everyone else's events from them).
 */
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/lib/admin";
import { learnFlowConcepts } from "@/data/learnFlow";

export const Route = createFileRoute("/_authenticated/admin/learn-funnel")({
  component: LearnFunnelPage,
});

type Range = "24h" | "7d" | "30d" | "all";

const RANGE_LABELS: Record<Range, string> = {
  "24h": "Last 24h",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  all: "All time",
};

function rangeStart(range: Range): string | null {
  const now = Date.now();
  const ms: Record<Range, number | null> = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
    all: null,
  };
  const offset = ms[range];
  return offset === null ? null : new Date(now - offset).toISOString();
}

type RawEvent = {
  id: string;
  user_id: string;
  session_id: string;
  event_name: string;
  concept_id: string | null;
  stage: string | null;
  created_at: string;
  metadata: Record<string, unknown>;
};

const FUNNEL_STEPS = [
  { key: "hook_shown", label: "Hook shown" },
  { key: "insight_shown", label: "Insight shown" },
  { key: "question_shown", label: "Question shown" },
  { key: "answer_submitted", label: "Answer submitted" },
  { key: "concept_completed", label: "Concept completed" },
  { key: "concept_advanced", label: "Advanced to next" },
] as const;

function LearnFunnelPage() {
  const { data: isAdmin, isLoading: roleLoading } = useIsAdmin();
  const [range, setRange] = useState<Range>("7d");

  const since = rangeStart(range);

  const { data: events, isLoading } = useQuery({
    queryKey: ["learn-events", range],
    enabled: isAdmin === true,
    queryFn: async (): Promise<RawEvent[]> => {
      let q = supabase
        .from("learn_events" as never)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10000);
      if (since) q = q.gte("created_at", since);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as unknown as RawEvent[];
    },
  });

  const funnel = useMemo(() => {
    if (!events) return [];
    // Count UNIQUE users per step — the right denominator for drop-off.
    const userSets = new Map<string, Set<string>>();
    for (const step of FUNNEL_STEPS) userSets.set(step.key, new Set());
    for (const e of events) {
      const set = userSets.get(e.event_name);
      if (set) set.add(e.user_id);
    }
    const totals = FUNNEL_STEPS.map((s) => ({
      key: s.key,
      label: s.label,
      users: userSets.get(s.key)!.size,
    }));
    const top = totals[0]?.users || 1;
    return totals.map((t, i) => ({
      ...t,
      pctOfTop: Math.round((t.users / top) * 100),
      dropFromPrev:
        i === 0
          ? 0
          : Math.max(0, totals[i - 1].users - t.users),
    }));
  }, [events]);

  // Per-concept analysis: where do users land but not advance?
  const perConcept = useMemo(() => {
    if (!events) return [];
    const byConcept = new Map<
      string,
      {
        hook_users: Set<string>;
        completed_users: Set<string>;
        advanced_users: Set<string>;
        total_attempts: number;
        wrong_attempts: number;
      }
    >();
    for (const c of learnFlowConcepts) {
      byConcept.set(c.id, {
        hook_users: new Set(),
        completed_users: new Set(),
        advanced_users: new Set(),
        total_attempts: 0,
        wrong_attempts: 0,
      });
    }
    for (const e of events) {
      if (!e.concept_id) continue;
      const bucket = byConcept.get(e.concept_id);
      if (!bucket) continue;
      if (e.event_name === "hook_shown") bucket.hook_users.add(e.user_id);
      else if (e.event_name === "concept_completed")
        bucket.completed_users.add(e.user_id);
      else if (e.event_name === "concept_advanced")
        bucket.advanced_users.add(e.user_id);
      else if (e.event_name === "answer_submitted") {
        bucket.total_attempts += 1;
        if ((e.metadata as { correct?: boolean })?.correct === false) {
          bucket.wrong_attempts += 1;
        }
      }
    }
    return learnFlowConcepts.map((c, idx) => {
      const b = byConcept.get(c.id)!;
      const reached = b.hook_users.size;
      const completed = b.completed_users.size;
      const advanced = b.advanced_users.size;
      const stuck = Math.max(0, reached - advanced);
      const wrongRate =
        b.total_attempts > 0
          ? Math.round((b.wrong_attempts / b.total_attempts) * 100)
          : 0;
      return {
        idx,
        id: c.id,
        stage: c.stage,
        reached,
        completed,
        advanced,
        stuck,
        wrongRate,
      };
    });
  }, [events]);

  // Per-user "stuck" detector: users who fired concept_completed for a
  // concept but never fired concept_advanced after it. Surfaces both:
  //   - users completing the same concept repeatedly without moving on
  //   - users who hit a wall on a specific concept and abandoned
  const stuckUsers = useMemo(() => {
    if (!events) return [];
    // Events come back ordered DESC; flip to ASC for sequential walking.
    const asc = [...events].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
    type StuckRow = {
      userId: string;
      conceptId: string;
      stage: string | null;
      completions: number;
      wrongAttempts: number;
      lastSeen: string;
    };
    // Key: userId|conceptId. We track running counts and clear when an
    // advance occurs after the most recent completion.
    const open = new Map<string, StuckRow>();
    const finalised: StuckRow[] = [];

    for (const e of asc) {
      if (!e.concept_id) continue;
      const key = `${e.user_id}|${e.concept_id}`;
      if (e.event_name === "concept_completed") {
        const row = open.get(key) ?? {
          userId: e.user_id,
          conceptId: e.concept_id,
          stage: e.stage,
          completions: 0,
          wrongAttempts: 0,
          lastSeen: e.created_at,
        };
        row.completions += 1;
        row.lastSeen = e.created_at;
        open.set(key, row);
      } else if (e.event_name === "answer_submitted") {
        const correct = (e.metadata as { correct?: boolean })?.correct;
        if (correct === false) {
          const row = open.get(key);
          if (row) {
            row.wrongAttempts += 1;
            row.lastSeen = e.created_at;
          }
        }
      } else if (e.event_name === "concept_advanced") {
        // User moved on — they're no longer stuck on this concept.
        open.delete(key);
      }
    }
    for (const row of open.values()) finalised.push(row);

    // Sort: repeat-completers first (strongest stuck signal), then by recency.
    return finalised
      .filter((r) => r.completions >= 1)
      .sort((a, b) => {
        if (b.completions !== a.completions)
          return b.completions - a.completions;
        return (
          new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
        );
      })
      .slice(0, 50);
  }, [events]);

  if (roleLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <ShieldAlert className="h-10 w-10 text-muted-foreground" />
        <h1 className="font-narrative text-2xl text-foreground">
          Admins only
        </h1>
        <p className="font-interface text-sm text-muted-foreground">
          This dashboard contains data about other users — recipient identities,
          activity timestamps, and flow-level drop-off. Only project admins can
          view it.
        </p>
        <Link
          to="/home"
          className="mt-2 inline-flex h-12 items-center justify-center rounded-full border border-border/60 bg-card/40 px-6 font-interface text-sm text-foreground"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-12 pt-6">
      <div className="flex items-center justify-between">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 font-interface text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
        <div className="flex gap-1 rounded-full border border-border/60 bg-card/40 p-1">
          {(Object.keys(RANGE_LABELS) as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-full px-3 py-1.5 font-interface text-xs transition-colors ${
                range === r
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {RANGE_LABELS[r]}
            </button>
          ))}
        </div>
      </div>

      <header className="mt-6">
        <h1 className="font-narrative text-3xl text-foreground">
          Learn funnel
        </h1>
        <p className="mt-1 font-interface text-sm text-muted-foreground">
          Where learners drop off — {RANGE_LABELS[range].toLowerCase()}.
        </p>
      </header>

      {isLoading ? (
        <div className="mt-10 flex justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <>
          <section className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-5">
            <h2 className="font-interface text-xs uppercase tracking-wider text-muted-foreground">
              Step-by-step
            </h2>
            <ul className="mt-3 space-y-2">
              {funnel.map((step) => (
                <li key={step.key}>
                  <div className="flex items-center justify-between font-interface text-sm">
                    <span className="text-foreground">{step.label}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {step.users} users
                      {step.dropFromPrev > 0 && (
                        <span className="ml-2 text-destructive">
                          −{step.dropFromPrev}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-background/60">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${step.pctOfTop}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
            {funnel.length === 0 && (
              <p className="mt-2 font-interface text-sm text-muted-foreground">
                No events recorded in this window yet.
              </p>
            )}
          </section>

          <section className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-5">
            <h2 className="font-interface text-xs uppercase tracking-wider text-muted-foreground">
              Per-concept stuck points
            </h2>
            <p className="mt-1 font-interface text-xs text-muted-foreground">
              Reached = saw hook · Stuck = reached but didn't advance · Wrong %
              = wrong answer rate across attempts
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full font-interface text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-2">#</th>
                    <th className="py-2">Concept</th>
                    <th className="py-2 text-right">Reached</th>
                    <th className="py-2 text-right">Completed</th>
                    <th className="py-2 text-right">Stuck</th>
                    <th className="py-2 text-right">Wrong %</th>
                  </tr>
                </thead>
                <tbody>
                  {perConcept
                    .filter((c) => c.reached > 0)
                    .map((c) => {
                      const stuckBad = c.stuck > 0 && c.reached >= 3;
                      const wrongBad = c.wrongRate >= 50;
                      return (
                        <tr
                          key={c.id}
                          className="border-t border-border/40"
                        >
                          <td className="py-2 text-muted-foreground tabular-nums">
                            {c.idx + 1}
                          </td>
                          <td className="py-2 text-foreground">
                            <span className="font-mono text-xs">{c.id}</span>
                            <span className="ml-2 rounded-full border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {c.stage}
                            </span>
                          </td>
                          <td className="py-2 text-right tabular-nums text-foreground">
                            {c.reached}
                          </td>
                          <td className="py-2 text-right tabular-nums text-foreground">
                            {c.completed}
                          </td>
                          <td
                            className={`py-2 text-right tabular-nums ${stuckBad ? "text-destructive" : "text-muted-foreground"}`}
                          >
                            {c.stuck}
                          </td>
                          <td
                            className={`py-2 text-right tabular-nums ${wrongBad ? "text-destructive" : "text-muted-foreground"}`}
                          >
                            {c.wrongRate}%
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              {perConcept.every((c) => c.reached === 0) && (
                <p className="mt-2 font-interface text-sm text-muted-foreground">
                  No concept activity in this window yet.
                </p>
              )}
            </div>
          </section>

          <section className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-5">
            <h2 className="font-interface text-xs uppercase tracking-wider text-muted-foreground">
              Stuck users
            </h2>
            <p className="mt-1 font-interface text-xs text-muted-foreground">
              Users who completed a concept but never advanced from it.
              Repeat completions on the same concept (≥2) are the strongest
              signal — likely re-running the same step instead of moving on.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full font-interface text-sm">
                <thead>
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="py-2">User</th>
                    <th className="py-2">Concept</th>
                    <th className="py-2 text-right">Completions</th>
                    <th className="py-2 text-right">Wrong</th>
                    <th className="py-2 text-right">Last seen</th>
                  </tr>
                </thead>
                <tbody>
                  {stuckUsers.map((row) => {
                    const repeatBad = row.completions >= 2;
                    const wrongBad = row.wrongAttempts >= 3;
                    return (
                      <tr
                        key={`${row.userId}-${row.conceptId}`}
                        className="border-t border-border/40"
                      >
                        <td
                          className="py-2 font-mono text-xs text-muted-foreground"
                          title={row.userId}
                        >
                          {row.userId.slice(0, 8)}…
                        </td>
                        <td className="py-2 text-foreground">
                          <span className="font-mono text-xs">
                            {row.conceptId}
                          </span>
                          {row.stage && (
                            <span className="ml-2 rounded-full border border-border/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                              {row.stage}
                            </span>
                          )}
                        </td>
                        <td
                          className={`py-2 text-right tabular-nums ${repeatBad ? "text-destructive" : "text-foreground"}`}
                        >
                          {row.completions}
                        </td>
                        <td
                          className={`py-2 text-right tabular-nums ${wrongBad ? "text-destructive" : "text-muted-foreground"}`}
                        >
                          {row.wrongAttempts}
                        </td>
                        <td className="py-2 text-right tabular-nums text-muted-foreground">
                          {new Date(row.lastSeen).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {stuckUsers.length === 0 && (
                <p className="mt-2 font-interface text-sm text-muted-foreground">
                  No stuck users in this window — everyone who completed a
                  concept advanced past it.
                </p>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
