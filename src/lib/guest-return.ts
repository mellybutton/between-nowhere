/**
 * Guest return detection: notices when a guest comes back to a tab they
 * left open for a while, so /home can offer a soft "save your spot" prompt.
 *
 * We stamp `lastSeen` on a heartbeat (visibility + interval) and compare on
 * return. Threshold is intentionally generous (30 min) so we don't nag users
 * who briefly tabbed away.
 */

import { useEffect, useState } from "react";

const KEY = "bn:guest:lastSeen";
const DISMISS_KEY = "bn:guest:returnDismissed";
const IDLE_THRESHOLD_MS = 30 * 60 * 1000; // 30 min

function read(key: string): number | null {
  if (typeof window === "undefined") return null;
  try {
    const v = window.sessionStorage.getItem(key);
    return v ? Number(v) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: number): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, String(value));
  } catch {
    /* sessionStorage unavailable — feature gracefully no-ops */
  }
}

export function stampGuestSeen(): void {
  write(KEY, Date.now());
}

export function dismissGuestReturnPrompt(): void {
  write(DISMISS_KEY, Date.now());
}

/**
 * Returns true if the guest has an open session that was idle past the
 * threshold and hasn't been dismissed since the last idle window.
 */
export function useGuestReturned(active: boolean): boolean {
  const [returned, setReturned] = useState(false);

  useEffect(() => {
    if (!active) return;

    const evaluate = () => {
      const last = read(KEY);
      const dismissed = read(DISMISS_KEY) ?? 0;
      if (!last) {
        stampGuestSeen();
        return;
      }
      const gap = Date.now() - last;
      if (gap >= IDLE_THRESHOLD_MS && dismissed < last) {
        setReturned(true);
      }
    };

    evaluate();

    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        evaluate();
      } else {
        stampGuestSeen();
      }
    };
    const heartbeat = window.setInterval(stampGuestSeen, 60 * 1000);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", evaluate);
    window.addEventListener("blur", stampGuestSeen);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", evaluate);
      window.removeEventListener("blur", stampGuestSeen);
      window.clearInterval(heartbeat);
    };
  }, [active]);

  return returned;
}
