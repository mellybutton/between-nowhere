import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./auth-context";
import { allQuestions } from "./questions";

export type SubelementMastery = {
  subelement: string;
  attempted: number;
  correct: number;
  /** 0–1 ratio, only meaningful if attempted > 0 */
  ratio: number;
  /** Bucket label for display */
  level: "not-started" | "learning" | "familiar" | "proficient" | "mastered";
};

type AttemptRow = {
  question_ids: string[];
  answers: unknown; // stored as Json — actually boolean[] | null[]
};

/** Fetch all practice attempts for the user (id-only payload, kept lean). */
export function usePracticeAnswers() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["practice_answers", user?.id ?? "anon"],
    enabled: !!user,
    queryFn: async (): Promise<AttemptRow[]> => {
      const { data, error } = await supabase
        .from("practice_attempts")
        .select("question_ids, answers")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as AttemptRow[];
    },
  });
}

/** Build a lookup of questionId -> subelement once. */
const questionSubelementMap: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const q of allQuestions) map[q.id] = q.subelement;
  return map;
})();

function bucket(ratio: number, attempted: number): SubelementMastery["level"] {
  if (attempted === 0) return "not-started";
  if (ratio >= 0.9) return "mastered";
  if (ratio >= 0.75) return "proficient";
  if (ratio >= 0.5) return "familiar";
  return "learning";
}

/**
 * For each subelement, aggregate the most recent answer per question across
 * all attempts. We weight the latest attempt's signal (a question seen twice
 * uses its most recent correctness).
 */
export function deriveSubelementMastery(
  rows: AttemptRow[] | undefined,
): Record<string, SubelementMastery> {
  // Initialize buckets for every subelement that exists in the pool.
  const result: Record<string, SubelementMastery> = {};
  for (const q of allQuestions) {
    if (!result[q.subelement]) {
      result[q.subelement] = {
        subelement: q.subelement,
        attempted: 0,
        correct: 0,
        ratio: 0,
        level: "not-started",
      };
    }
  }

  if (!rows || rows.length === 0) return result;

  // Walk newest -> oldest; track first-seen (i.e. most recent) result per qid.
  const seen = new Set<string>();
  for (const row of rows) {
    const ids = row.question_ids ?? [];
    const ans = Array.isArray(row.answers) ? row.answers : [];
    for (let i = 0; i < ids.length; i++) {
      const qid = ids[i];
      if (!qid || seen.has(qid)) continue;
      seen.add(qid);
      const sub = questionSubelementMap[qid];
      if (!sub || !result[sub]) continue;
      result[sub].attempted += 1;
      if (ans[i] === true) result[sub].correct += 1;
    }
  }

  for (const sub of Object.keys(result)) {
    const m = result[sub];
    m.ratio = m.attempted > 0 ? m.correct / m.attempted : 0;
    m.level = bucket(m.ratio, m.attempted);
  }
  return result;
}
