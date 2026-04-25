import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./auth-context";
import { useConceptProgress } from "./progress";

export type PracticeAttemptRow = {
  id: string;
  score: number;
  total: number;
  weak_categories: string[];
  created_at: string;
};

/** Fetch recent practice attempts (newest first). */
export function usePracticeHistory(limit = 10) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["practice_attempts", user?.id ?? "anon", limit],
    enabled: !!user,
    queryFn: async (): Promise<PracticeAttemptRow[]> => {
      const { data, error } = await supabase
        .from("practice_attempts")
        .select("id, score, total, weak_categories, created_at")
        .order("created_at", { ascending: false })
        .limit(limit);
      if (error) throw error;
      return (data ?? []) as PracticeAttemptRow[];
    },
  });
}

/**
 * Derived momentum signals: streak (consecutive days with at least one
 * concept completed), days since last activity, and best/recent practice
 * scores. Pure — works off of already-fetched query data.
 */
export function deriveMomentum(opts: {
  conceptRows:
    | Array<{ status: string; completed_at: string | null; updated_at?: string }>
    | undefined;
  practiceRows: PracticeAttemptRow[] | undefined;
}) {
  const concepts = opts.conceptRows ?? [];
  const practice = opts.practiceRows ?? [];

  // Activity dates from concepts (completed_at preferred, fallback updated_at).
  const days = new Set<string>();
  let lastActivity: Date | null = null;
  for (const c of concepts) {
    const ts = c.completed_at ?? c.updated_at ?? null;
    if (!ts) continue;
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) continue;
    days.add(toDayKey(d));
    if (!lastActivity || d > lastActivity) lastActivity = d;
  }
  for (const p of practice) {
    const d = new Date(p.created_at);
    if (Number.isNaN(d.getTime())) continue;
    days.add(toDayKey(d));
    if (!lastActivity || d > lastActivity) lastActivity = d;
  }

  // Day streak: walk back from today (or yesterday if no activity today).
  const today = new Date();
  const todayKey = toDayKey(today);
  const yesterdayKey = toDayKey(addDays(today, -1));
  let streak = 0;
  let cursor: Date;
  if (days.has(todayKey)) {
    cursor = today;
  } else if (days.has(yesterdayKey)) {
    cursor = addDays(today, -1);
  } else {
    cursor = today;
  }
  while (days.has(toDayKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
    if (streak > 365) break;
  }

  const daysSinceLast = lastActivity
    ? Math.max(
        0,
        Math.floor(
          (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24),
        ),
      )
    : 0;

  // Practice signals
  const total = practice[0]?.total ?? 35;
  const passMark = Math.ceil(total * 0.74); // FCC pass: 26/35 ≈ 74%
  const bestScore = practice.reduce<number | null>(
    (best, p) => (best === null || p.score > best ? p.score : best),
    null,
  );
  const recentScores = practice.slice(0, 3).map((p) => p.score);
  const recentAvg =
    recentScores.length > 0
      ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length
      : null;

  // Plateau: last 3 attempts within ±1 of each other AND below pass mark.
  let plateau = false;
  if (recentScores.length === 3) {
    const min = Math.min(...recentScores);
    const max = Math.max(...recentScores);
    plateau = max - min <= 1 && max < passMark;
  }

  // Comparison vs. best for the most-recent attempt
  const lastAttempt = practice[0] ?? null;
  const priorBest =
    practice.length > 1
      ? practice.slice(1).reduce<number | null>(
          (best, p) => (best === null || p.score > best ? p.score : best),
          null,
        )
      : null;

  return {
    streak,
    daysSinceLast,
    isReturning: daysSinceLast >= 1 && (concepts.length > 0 || practice.length > 0),
    practiceCount: practice.length,
    lastAttempt,
    priorBest,
    bestScore,
    recentAvg,
    plateau,
    passMark,
    total,
  };
}

/** Combine concept + practice queries into one momentum object. */
export function useMomentum() {
  const concepts = useConceptProgress();
  const practice = usePracticeHistory(10);
  const data = deriveMomentum({
    conceptRows: concepts.data,
    practiceRows: practice.data,
  });
  return { ...data, isLoading: concepts.isLoading || practice.isLoading };
}

// ---------- helpers ----------

function toDayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(d: Date, n: number): Date {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}
