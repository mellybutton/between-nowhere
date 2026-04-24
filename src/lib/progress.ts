import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { learnFlowConcepts } from "@/data/learnFlow";
import { useAuth } from "./auth-context";

export type ConceptProgressRow = {
  id: string;
  user_id: string;
  concept_id: string;
  status: "in_progress" | "completed" | "needs_review";
  was_correct_first_try: boolean | null;
  attempts: number;
  completed_at: string | null;
};

export function useConceptProgress() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["concept_progress", user?.id ?? "anon"],
    enabled: !!user,
    queryFn: async (): Promise<ConceptProgressRow[]> => {
      const { data, error } = await supabase
        .from("concept_progress")
        .select("*")
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as ConceptProgressRow[];
    },
  });
}

export function useRecordConcept() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      conceptId: string;
      wasCorrectFirstTry: boolean;
    }) => {
      if (!user) throw new Error("Not authenticated");

      const { data: existing } = await supabase
        .from("concept_progress")
        .select("*")
        .eq("concept_id", input.conceptId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("concept_progress")
          .update({
            status: "completed",
            attempts: (existing.attempts ?? 0) + 1,
            was_correct_first_try:
              existing.was_correct_first_try ?? input.wasCorrectFirstTry,
            completed_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("concept_progress").insert({
          user_id: user.id,
          concept_id: input.conceptId,
          status: "completed",
          attempts: 1,
          was_correct_first_try: input.wasCorrectFirstTry,
          completed_at: new Date().toISOString(),
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concept_progress"] });
    },
  });
}

/** Stats derived from concept progress rows */
export function deriveProgressStats(rows: ConceptProgressRow[] | undefined) {
  const total = learnFlowConcepts.length;
  const completedIds = new Set(
    (rows ?? []).filter((r) => r.status === "completed").map((r) => r.concept_id),
  );
  const completed = completedIds.size;
  const remaining = Math.max(total - completed, 0);
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Find the next concept (first one not completed in the staged order)
  const nextConcept =
    learnFlowConcepts.find((c) => !completedIds.has(c.id)) ?? null;
  const nextIndex = nextConcept
    ? learnFlowConcepts.findIndex((c) => c.id === nextConcept.id)
    : 0;

  return { total, completed, remaining, percent, nextConcept, nextIndex };
}
