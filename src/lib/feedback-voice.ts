/**
 * Between Nowhere — feedback voice.
 *
 * Tone: smart, warm, signal-themed, lightly poetic. Never cheesy.
 * Never shame the user. Mistakes are recoverable. Momentum is real.
 *
 * Every helper returns a small object with a short headline and a single
 * supporting line — designed to fit in a card without crowding the eye.
 *
 * Source of truth for all in-app copy. Pools are deliberately wide so the
 * same surface rarely repeats itself within a session.
 */

export type Tone = "calm" | "encourage" | "celebrate" | "steady" | "gentle";

export type FeedbackLine = {
  headline: string;
  body?: string;
  tone: Tone;
};

// ---------- Correct answer (single concept) ----------

const correctFirstTryPool: string[] = [
  "Nice. You're seeing the pattern.",
  "Exactly.",
  "That tracks.",
  "You've got it.",
  "Right on.",
  "Clean hit.",
  "Yes — that's the idea.",
  "Correct. Keep going.",
  "Nicely reasoned.",
  "You're tuning in.",
];

const correctRecoveredPool: { headline: string; body: string }[] = [
  { headline: "There it is.", body: "Second look, clearer signal." },
  { headline: "You worked it out.", body: "That kind of fix sticks." },
  { headline: "Got there.", body: "Most things worth knowing take two passes." },
  { headline: "Caught it.", body: "Recovery counts more than first guesses." },
];

export function correctAnswerCopy(opts: {
  isFirstTry: boolean;
  streak: number; // current concept streak (correct first-try in a row)
}): FeedbackLine {
  const { isFirstTry, streak } = opts;

  if (!isFirstTry) {
    return { ...pick(correctRecoveredPool), tone: "gentle" };
  }

  if (streak >= 5) {
    return {
      headline: pick(streakFivePool),
      body: `${streak} clean signals in a row.`,
      tone: "celebrate",
    };
  }
  if (streak === 3 || streak === 4) {
    return {
      headline: pick(streakThreePool),
      body: `${streak} in a row — momentum.`,
      tone: "encourage",
    };
  }

  return { headline: pick(correctFirstTryPool), tone: "calm" };
}

// ---------- Wrong attempt (still on the same question) ----------

const wrongFirstPool: string[] = [
  "Easy mix-up.",
  "Close.",
  "Almost.",
  "This one trips people up.",
  "Understandable miss.",
  "Common confusion.",
  "You're near it.",
  "Good instinct, wrong lever.",
];

const wrongSecondPool: string[] = [
  "Not quite — let's sharpen it.",
  "Let's untangle that.",
  "One detail's still off.",
  "Closer. Narrow it down.",
];

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
      headline: pick(wrongSecondPool),
      body: "One detail's still off — narrow it down.",
      tone: "gentle",
    };
  }
  return {
    headline: pick(wrongFirstPool),
    body: "Look once more. The signal's in there.",
    tone: "gentle",
  };
}

// ---------- Explanation bridges (after a wrong answer is revealed) ----------

const explanationBridges: string[] = [
  "Here's what matters:",
  "The key distinction:",
  "What changes this answer:",
  "The signal hidden in the noise:",
  "The part most people miss:",
  "Where the logic turns:",
  "What to watch for next time:",
  "Why this one works:",
  "The deciding factor:",
  "Here's the pattern:",
];

export function explanationBridge(): string {
  return pick(explanationBridges);
}

// ---------- Streaks (used as headlines on the reveal card) ----------

const streakThreePool: string[] = [
  "Something's clicking.",
  "You're finding the rhythm.",
  "Three clean hits.",
  "Nice momentum.",
  "You're warming up.",
  "Pattern recognition online.",
  "That's a run.",
  "Strong sequence.",
  "Signal improving.",
  "Keep this pace.",
];

const streakFivePool: string[] = [
  "You're getting radio eyes.",
  "Five straight. Real progress.",
  "Locked in.",
  "You're reading the terrain now.",
  "Excellent run.",
  "Strong signal.",
  "You're in flow.",
  "Sharp work.",
  "This is real momentum.",
];

// ---------- Streak surfaces (Home, badges) ----------

export function streakBadge(streak: number): string | null {
  if (streak < 2) return null;
  if (streak < 5) return `${streak}-day signal`;
  if (streak < 10) return `${streak} days locked in`;
  return `${streak} days · steady transmit`;
}

// ---------- Category mastery ----------

const masteryFluentBodies: string[] = [
  "You've cleared this section.",
  "Strong grasp here.",
  "You've built footing here.",
  "One weak spot less.",
  "This topic is stabilizing.",
];

export function categoryMasteryCopy(opts: {
  category: string;
  accuracy: number; // 0..1
  total: number;
}): FeedbackLine | null {
  const { category, accuracy, total } = opts;
  if (total < 3) return null;
  if (accuracy >= 0.9) {
    return {
      headline: `${category} unlocked.`,
      body: pick(masteryFluentBodies),
      tone: "celebrate",
    };
  }
  if (accuracy >= 0.75) {
    return {
      headline: `${category} looking solid.`,
      body: "A few edges to polish, then it's yours.",
      tone: "encourage",
    };
  }
  return null;
}

// ---------- Practice exam results ----------

const passComfortableHeadlines: string[] = [
  "You'd likely pass today.",
  "This score travels.",
  "You're in a strong position.",
  "Looking test-ready.",
];

const passCloseHeadlines: string[] = [
  "Passing range achieved.",
  "This score can clear the bar.",
  "Real progress. Passing territory.",
  "You're where you need to be.",
];

const failNearMissHeadlines: string[] = [
  "Closer than it feels.",
  "A few questions away.",
  "Near the line. Keep going.",
  "You're not far off.",
  "The gap is smaller than it looks.",
  "You're in striking distance.",
];

const failEarlyHeadlines: string[] = [
  "This is workable.",
  "Strong base, a few leaks.",
  "Very recoverable.",
  "This can turn quickly.",
];

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
        headline: pick(passComfortableHeadlines),
        body: "Today's exam, you'd walk through it.",
        tone: "celebrate",
      };
    }
    if (margin >= 3) {
      return {
        headline: pick(passComfortableHeadlines),
        body: "Steady margin. Keep this rhythm and the real exam looks the same.",
        tone: "celebrate",
      };
    }
    return {
      headline: pick(passCloseHeadlines),
      body: "It counts — and it'll feel firmer with one more pass.",
      tone: "encourage",
    };
  }

  // Failed
  if (improved) {
    return {
      headline: pick(failNearMissHeadlines),
      body: `Up from ${bestPrior}. The pool is loosening.`,
      tone: "encourage",
    };
  }
  if (sameAsLast) {
    return {
      headline: pick(plateauHeadlines),
      body: "Same score, different mistakes. Try the weak spots below.",
      tone: "steady",
    };
  }
  if (ratio >= 0.6) {
    return {
      headline: pick(failNearMissHeadlines),
      body: `${passMark - score} more right would have done it.`,
      tone: "encourage",
    };
  }
  return {
    headline: pick(failEarlyHeadlines),
    body: "Most of the pool is still new. Lean on the learning flow first.",
    tone: "calm",
  };
}

// ---------- Plateau ----------

const plateauHeadlines: string[] = [
  "You're closer than it feels.",
  "Scores wobble before they rise.",
  "Plateaus are part of learning.",
  "Same score, better instincts.",
  "Progress is happening underneath.",
  "Quiet growth still counts.",
];

export function plateauCopy(): FeedbackLine {
  return {
    headline: pick(plateauHeadlines),
    body: "Keep pressure on the weak spots — the next jump often hides here.",
    tone: "steady",
  };
}

// ---------- Repeated misses (3+ wrong in a short window) ----------

const repeatedMissHeadlines: string[] = [
  "Let's tighten this up.",
  "You're in a noisy patch.",
  "Time for a quick reset.",
  "Let's slow it down and rebuild.",
  "We found the friction point.",
  "This topic needs a cleaner signal.",
  "Let's simplify the next few.",
  "You're not stuck, just tangled.",
  "Time for targeted reps.",
  "Let's tune this section.",
];

export type RepeatedMissCta =
  | "quick-review"
  | "easier-round"
  | "rebuild-confidence"
  | "focus-topic";

export function repeatedMissCopy(): {
  line: FeedbackLine;
  ctas: { id: RepeatedMissCta; label: string }[];
} {
  return {
    line: {
      headline: pick(repeatedMissHeadlines),
      body: "Pick a softer path — momentum returns faster than you'd think.",
      tone: "gentle",
    },
    ctas: [
      { id: "quick-review", label: "Quick Review" },
      { id: "easier-round", label: "Easier Round" },
      { id: "rebuild-confidence", label: "Rebuild Confidence" },
      { id: "focus-topic", label: "Focus This Topic" },
    ],
  };
}

// ---------- Readiness (a derived signal across attempts) ----------

const readyHeadlines: string[] = [
  "You are ready.",
  "This looks test-ready.",
  "You've built enough signal.",
  "Time to book the exam.",
  "The work is showing.",
  "This is what ready looks like.",
  "You've earned the next step.",
  "Strong scores, steady footing.",
  "Time to transmit.",
];

export function readinessCopy(opts: {
  recentAvg: number; // average score (0..total) over last 3 attempts
  total: number;
  passMark: number;
}): FeedbackLine | null {
  const { recentAvg, total, passMark } = opts;
  if (recentAvg >= passMark + 4) {
    return {
      headline: pick(readyHeadlines),
      body: `${Math.round((recentAvg / total) * 100)}% average — go make it official.`,
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

export const readyCtas = [
  { id: "find-session" as const, label: "Find a Test Session" },
  { id: "book-exam" as const, label: "Book Exam" },
  { id: "final-review" as const, label: "Final Review Round" },
];

// ---------- Returning user ----------

const returningSamePool: string[] = [
  "Welcome back. We saved your place.",
  "Good to see you again.",
  "Back on frequency.",
  "Welcome back to the board.",
];

const returningShortPool: string[] = [
  "Ready to pick up where you left off?",
  "Your signal is still here.",
  "You've still got momentum.",
  "Ready for another round?",
];

const returningLongPool: string[] = [
  "Let's continue the climb.",
  "Let's get moving again.",
  "Signal reacquired.",
];

export function returningCopy(opts: {
  daysSinceLast: number;
  completed: number;
}): FeedbackLine | null {
  const { daysSinceLast, completed } = opts;
  if (completed === 0) return null;
  if (daysSinceLast < 1) return null;
  if (daysSinceLast === 1) {
    return {
      headline: pick(returningSamePool),
      body: "Picking up where you left off.",
      tone: "calm",
    };
  }
  if (daysSinceLast <= 3) {
    return {
      headline: pick(returningShortPool),
      body: `${daysSinceLast} days — your progress is right where you left it.`,
      tone: "calm",
    };
  }
  if (daysSinceLast <= 14) {
    return {
      headline: pick(returningLongPool),
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

const emptyHomePool: string[] = [
  "Your signal starts here.",
  "Quiet board. Let's light it up.",
  "Blank slate, strong potential.",
  "Begin and the map appears.",
  "Ready when you are.",
  "Let's make the first mark.",
];

export const emptyStates = {
  homeFresh: {
    headline: "Your signal starts here.",
    body: "Start with your first concept — about ten minutes to your first signal.",
    tone: "calm" as const,
  },
  practiceFresh: {
    headline: "Nothing logged yet. Good place to begin.",
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

export function randomEmptyHome(): string {
  return pick(emptyHomePool);
}

// ---------- Session completion ----------

const sessionCompletePool: { headline: string; body: string }[] = [
  { headline: "Nice session.", body: "Come back while it's warm." },
  { headline: "Good work today.", body: "Another layer added." },
  { headline: "That moved the needle.", body: "Useful reps." },
  { headline: "Solid reps.", body: "You're building real recall." },
  { headline: "Strong session complete.", body: "Momentum maintained." },
];

export function sessionCompleteCopy(): FeedbackLine {
  return { ...pick(sessionCompletePool), tone: "encourage" };
}

// ---------- Load / retry / technical errors ----------

const errorHeadlines: string[] = [
  "We lost the signal for a second.",
  "Brief interference. Retrying.",
  "That didn't come through cleanly.",
  "Connection hiccup.",
  "One moment — tuning back in.",
  "Temporary static.",
  "Small disruption, no progress lost.",
  "Signal returning.",
];

export function errorCopy(): FeedbackLine {
  return {
    headline: pick(errorHeadlines),
    body: "We'll get you back in.",
    tone: "calm",
  };
}

export const errorCtas = [
  { id: "retry" as const, label: "Retry" },
  { id: "offline" as const, label: "Continue Offline" },
  { id: "home" as const, label: "Back Home" },
];

// ---------- Confidence boosters (subtle background lines) ----------

const confidencePool: string[] = [
  "You know more than you think.",
  "This is learnable.",
  "Most people start exactly here.",
  "You're building signal, not guessing.",
  "Repetition works.",
  "It gets easier suddenly.",
  "Keep showing up.",
  "You're not behind.",
  "This compounds quickly.",
  "Stay with it.",
];

export function confidenceLine(): string {
  return pick(confidencePool);
}

// ---------- helpers ----------

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
