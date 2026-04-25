import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight, LogOut } from "lucide-react";
import { allQuestions, categoryMap } from "@/lib/questions";
import { supabase } from "@/integrations/supabase/client";
import { useConceptProgress, deriveProgressStats } from "@/lib/progress";
import {
  usePracticeAnswers,
  deriveSubelementMastery,
  type SubelementMastery,
} from "@/lib/mastery";

const LEVEL_LABEL: Record<SubelementMastery["level"], string> = {
  "not-started": "Not started",
  learning: "Learning",
  familiar: "Familiar",
  proficient: "Proficient",
  mastered: "Mastered",
};

const LEVEL_STYLES: Record<SubelementMastery["level"], string> = {
  "not-started":
    "border-border/40 bg-transparent text-muted-foreground/70",
  learning:
    "border-amber-400/30 bg-amber-400/10 text-amber-200",
  familiar:
    "border-sky-400/30 bg-sky-400/10 text-sky-200",
  proficient:
    "border-primary-accent/40 bg-primary-accent/10 text-primary-accent",
  mastered:
    "border-emerald-400/40 bg-emerald-400/10 text-emerald-200",
};

const LEVEL_DOTS = 4;
const LEVEL_FILLED: Record<SubelementMastery["level"], number> = {
  "not-started": 0,
  learning: 1,
  familiar: 2,
  proficient: 3,
  mastered: 4,
};

export const Route = createFileRoute("/_authenticated/review")({
  component: ReviewPage,
});

function ReviewPage() {
  const { data: rows } = useConceptProgress();
  const stats = deriveProgressStats(rows);

  const groups = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of allQuestions) {
      counts[q.subelement] = (counts[q.subelement] ?? 0) + 1;
    }
    return Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-interface text-xs uppercase tracking-[0.18em] text-muted-foreground">
            The pool
          </p>
          <h1 className="mt-2 font-narrative text-4xl leading-tight text-foreground">
            Browse by subject
          </h1>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors hover:bg-card/40 hover:text-foreground"
          aria-label="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>

      <p className="mt-3 font-interface text-sm leading-relaxed text-muted-foreground">
        All {allQuestions.length} official Technician questions, organized by
        subelement. You've completed{" "}
        <span className="text-primary-accent">{stats.completed}</span> of{" "}
        {stats.total} learning concepts.
      </p>

      <ul className="mt-8 space-y-3">
        {groups.map(([sub, count]) => (
          <li key={sub}>
            <Link
              to="/learn"
              className="group flex items-center justify-between rounded-2xl border border-border/40 bg-card/40 px-5 py-4 transition-colors hover:border-primary-accent/40 hover:bg-card/60"
            >
              <div>
                <p className="font-interface text-[11px] uppercase tracking-wider text-muted-foreground">
                  {sub}
                </p>
                <p className="mt-0.5 font-interface text-[15px] text-foreground">
                  {categoryMap[sub] ?? sub}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-interface text-sm font-mono-numeric text-muted-foreground">
                  {count}
                </span>
                <ArrowRight
                  className="h-4 w-4 text-muted-foreground/60 transition-all group-hover:translate-x-0.5 group-hover:text-primary-accent"
                  strokeWidth={1.75}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        to="/learn"
        className="mt-10 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground"
      >
        {stats.completed === 0 ? "Start learning" : "Continue learning"}{" "}
        <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
