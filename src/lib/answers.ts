// Shared answer-evaluation utilities used by Learn and Practice flows.
// Source data stores answers in a fixed order with a `correctIndex` pointing
// at the correct choice. To prevent positional bias (and bugs that assume the
// first answer is always correct), we attach an `isCorrect` flag to every
// displayed answer BEFORE shuffling. Evaluation then compares against
// `isCorrect`, never against the displayed letter or original index.

export type DisplayAnswer = {
  text: string;
  isCorrect: boolean;
  /** Index in the original (unshuffled) source array — useful for analytics. */
  originalIndex: number;
};

/**
 * Build display-ready answer objects from raw text + correctIndex, then
 * shuffle them. Order is randomized per call.
 */
export function buildShuffledAnswers(
  answers: string[],
  correctIndex: number,
): DisplayAnswer[] {
  const tagged: DisplayAnswer[] = answers.map((text, i) => ({
    text,
    isCorrect: i === correctIndex,
    originalIndex: i,
  }));
  // Fisher-Yates
  for (let i = tagged.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tagged[i], tagged[j]] = [tagged[j], tagged[i]];
  }
  return tagged;
}

/** Returns the index of the correct answer in a displayed (shuffled) list. */
export function findCorrectDisplayIndex(displayed: DisplayAnswer[]): number {
  return displayed.findIndex((a) => a.isCorrect);
}

/**
 * Debug overlay for answer evaluation. OFF by default everywhere.
 * Toggle from the browser console:
 *   localStorage.setItem("__answerDebug", "1"); location.reload();
 *   localStorage.removeItem("__answerDebug"); location.reload();
 */
export const isAnswerDebug =
  typeof window !== "undefined" &&
  window.localStorage?.getItem("__answerDebug") === "1";

/** @deprecated kept for backwards compatibility — use isAnswerDebug. */
export const isDev = isAnswerDebug;
