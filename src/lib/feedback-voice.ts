/**
 * Between Nowhere — feedback voice.
 *
 * Tone: smart, warm, signal-themed, lightly poetic. Never cheesy.
 * Never shame the user. Mistakes are recoverable. Momentum is real.
 *
 * Every helper returns a small object with a short headline and a single
 * supporting line — designed to fit in a card without crowding the eye.
 */

export type Tone = "calm" | "encourage" | "celebrate" | "steady" | "gentle";

export type FeedbackLine = {
  headline: string;
  body?: string;
  tone: Tone;
};

// ---------- Correct answer (single concept) ----------

export function correctAnswerCopy(opts: {
  isFirstTry: boolean;
  streak: number; // current concept streak (correct first-try in a row)
}): FeedbackLine {
  const { isFirstTry, streak } = opts;

  if (!isFirstTry) {
    const lines = [
      { headline: "There it is.", body: "Second look, clearer signal." },
      { headline: "You worked it out.", body: "That kind of fix sticks." },
      {
        headline: "Got there.",
        body: "Most things worth knowing take two passes.",
      },
    ];
    return { ...pick(lines), tone: "gentle" };
  }

  if (streak >= 5) {
    return {
      headline: "Locked in.",
      body: `${streak} clean signals in a row.`,
      tone: "celebrate",
    };
  }
  if (streak === 3 || streak === 4) {
    return {
      headline: "Tracking.",
      body: `${streak} in a row — momentum.`,
      tone: "encourage",
    };
  }

  const lines = [
    { headline: "Clean signal." },
    { headline: "On frequency." },
    { headline: "That's it." },
    { headline: "Right on." },
  ];
  return { ...pick(lines), tone: "calm" };
}

// ---------- Wrong attempt (still on the same question) ----------

export function wrongAttemptCopy(opts: {
  attempt: number; // 1 = first miss, 2 = second, etc.
}): FeedbackLine {
  const { attempt } = opts;
  if (attempt >= 3) {
    return {
      headline: "Take a breath.",
      body: "Use the hint — this one rewards a closer read.",
      tone: "gentle",
    };
  }
  if (attempt === 2) {
    return {
      headline: "Closer.",
      body: "One detail's still off — narrow it down.",
      tone: "gentle",
    };
  }
  return {
    headline: "Not quite.",
    body: "Look once more. The signal's in there.",
    tone: "gentle",
  };
}

// ---------- Streak surfaces (Home, badges) ----------

export function streakBadge(streak: number): string | null {
  if (streak < 2) return null;
  if (streak < 5) return `${streak}-day signal`;
  if (streak < 10) return `${streak} days locked in`;
  return `${streak} days · steady transmit`;
}

// ---------- Category mastery ----------

export function categoryMasteryCopy(opts: {
  category: string;
  accuracy: number; // 0..1
  total: number;
}): FeedbackLine | null {
  const { category, accuracy, total } = opts;
  if (total < 3) return null;
  if (accuracy >= 0.9) {
    return {
      headline: `${category} — fluent.`,
      body: "You can transmit this one yourself.",
      tone: "celebrate",
    };
  }
  if (accuracy >= 0.75) {
    return {
      headline: `${category} — strong.`,
      body: "A few edges to polish, then it's yours.",
      tone: "encourage",
    };
  }
  return null;
}

// ---------- Practice exam results ----------

export function examResultCopy(opts: {
  score: number;
  total: number;
  passMark: number;
  bestPrior: number | null; // best previous score (0..total) or null
}): FeedbackLine {
  const { score, total, passMark, bestPrior } = opts;
  const passed = score >= passMark;
  const ratio = score / total;
  const margin = score - passMark;
  const improved = bestPrior !== null && score > bestPrior;
  const sameAsLast = bestPrior !== null && score === bestPrior;

  if (passed) {
    if (margin >= 7) {
      return {
        headline: "You're past the line — comfortably.",
        body: "Today's exam, you'd walk through it.",
        tone: "celebrate",
      };
    }
    if (margin >= 3) {
      return {
        headline: "Cleared.",
        body: "Steady margin. Keep this rhythm and the real exam looks the same.",
        tone: "celebrate",
      };
    }
    return {
      headline: "Just past.",
      body: "It counts — and it'll feel firmer with one more pass.",
      tone: "encourage",
    };
  }

  // Failed
  if (improved) {
    return {
      headline: "Closer than last time.",
      body: `Up from ${bestPrior}. The pool is loosening.`,
      tone: "encourage",
    };
  }
  if (sameAsLast) {
    return {
      headline: "A plateau.",
      body: "Same score, different mistakes. Try the weak spots below.",
      tone: "steady",
    };
  }
  if (ratio >= 0.6) {
    return {
      headline: "Almost in range.",
      body: `${passMark - score} more right would have done it.`,
      tone: "encourage",
    };
  }
  return {
    headline: "Early days.",
    body: "Most of the pool is still new. Lean on the learning flow first.",
    tone: "calm",
  };
}

// ---------- Readiness (a derived signal across attempts) ----------

export function readinessCopy(opts: {
  recentAvg: number; // average score (0..total) over last 3 attempts
  total: number;
  passMark: number;
}): FeedbackLine | null {
  const { recentAvg, total, passMark } = opts;
  if (recentAvg >= passMark + 4) {
    return {
      headline: "You're exam-ready.",
      body: `${Math.round((recentAvg / total) * 100)}% average — book the test.`,
      tone: "celebrate",
    };
  }
  if (recentAvg >= passMark) {
    return {
      headline: "Reading as ready.",
      body: "Three exams in a row above the line.",
      tone: "encourage",
    };
  }
  return null;
}

// ---------- Returning user ----------

export function returningCopy(opts: {
  daysSinceLast: number;
  completed: number;
}): FeedbackLine | null {
  const { daysSinceLast, completed } = opts;
  if (completed === 0) return null;
  if (daysSinceLast < 1) return null;
  if (daysSinceLast === 1) {
    return {
      headline: "Back on the air.",
      body: "Picking up where you left off.",
      tone: "calm",
    };
  }
  if (daysSinceLast <= 3) {
    return {
      headline: "Welcome back.",
      body: `${daysSinceLast} days — your progress is right where you left it.`,
      tone: "calm",
    };
  }
  if (daysSinceLast <= 14) {
    return {
      headline: "Signal reacquired.",
      body: "Nothing lost — your concepts are still here.",
      tone: "encourage",
    };
  }
  return {
    headline: "It's been a minute.",
    body: "A short refresher and you'll be tracking again.",
    tone: "gentle",
  };
}

// ---------- Empty states ----------

export const emptyStates = {
  homeFresh: {
    headline: "A quiet frequency.",
    body: "Start with your first concept — about ten minutes to your first signal.",
    tone: "calm" as const,
  },
  practiceFresh: {
    headline: "No exams yet.",
    body: "Take one when you're ready — they're 35 questions and they save automatically.",
    tone: "calm" as const,
  },
  reviewFresh: {
    headline: "The full pool, untouched.",
    body: "Browse a subelement or jump back into learning.",
    tone: "calm" as const,
  },
  allConceptsDone: {
    headline: "Every signal received.",
    body: "Practice exams from here — that's the only thing left between you and the test.",
    tone: "celebrate" as const,
  },
};

// ---------- helpers ----------

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
