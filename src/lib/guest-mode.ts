/**
 * Guest mode: lets a visitor explore the app without creating an account.
 *
 * Stored in sessionStorage (not localStorage) on purpose — guest mode is
 * intentionally ephemeral. Closing the tab ends the session and no progress
 * is saved anywhere. This matches the user-facing promise of "no progress
 * saved".
 */

const KEY = "bn:guest";

export function isGuest(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function enterGuestMode(): void {
  if (typeof window === "undefined") return;
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
