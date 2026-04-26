/**
 * Lightweight client-side event tracker for the Learn funnel.
 *
 * - Writes to public.learn_events (RLS scoped to the authenticated user).
 * - Skips guests (no user_id, RLS would reject anyway).
 * - Generates a per-tab session_id so we can group a learner's events
 *   from a single sitting.
 * - Fire-and-forget: never blocks the UI, swallows network errors silently.
 *
 * Use sparingly — call `trackLearnEvent` once per meaningful step, not
 * inside render loops.
 */
import { supabase } from "@/integrations/supabase/client";
import { isGuest } from "./guest-mode";

const SESSION_KEY = "bn:learn:session";

function getSessionId(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  try {
    let id = window.sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

export type LearnEventName =
  | "hook_shown"
  | "insight_shown"
  | "question_shown"
  | "hint_revealed"
  | "answer_submitted"
  | "concept_completed"
  | "success_dismissed"
  | "concept_advanced"
  | "flow_completed";

export type LearnEventInput = {
  event: LearnEventName;
  conceptId?: string | null;
  stage?: string | null;
  metadata?: Record<string, unknown>;
};

export async function trackLearnEvent(input: LearnEventInput): Promise<void> {
  // Guests have no user_id; RLS would block anyway, so skip the round-trip.
  if (isGuest()) return;
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id;
    if (!userId) return;

    await supabase.from("learn_events").insert({
      user_id: userId,
      session_id: getSessionId(),
      event_name: input.event,
      concept_id: input.conceptId ?? null,
      stage: input.stage ?? null,
      metadata: input.metadata ?? {},
    });
  } catch {
    // Analytics must never break the UX.
  }
}
