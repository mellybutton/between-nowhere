/**
 * Guest mode: lets a visitor explore the app without creating an account.
 *
 * Stored in sessionStorage (not localStorage) on purpose — guest mode is
 * intentionally ephemeral. Closing the tab ends the session and no progress
 * is saved anywhere. This matches the user-facing promise of "no progress
 * saved".
 */

import { supabase } from "@/integrations/supabase/client";

const KEY = "bn:guest";

export function isGuest(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Enter guest mode. If a real Supabase session exists, sign it out first so
 * the prior user's saved progress doesn't leak into the guest view.
 */
export async function enterGuestMode(): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
      await supabase.auth.signOut();
    }
  } catch {
    /* if sign-out fails we still proceed — guest gating below also hides data */
  }
  try {
    window.sessionStorage.setItem(KEY, "1");
  } catch {
    /* sessionStorage unavailable — guest mode just won't persist across nav */
  }
}

export function exitGuestMode(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
}
