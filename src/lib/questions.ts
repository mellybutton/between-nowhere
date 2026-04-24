import data from "@/data/questions.json";

export type Question = {
  id: string;
  poolVersion: string;
  licenseClass: string;
  subelement: string;
  group: string;
  category: string;
  groupTopic: string;
  officialQuestion: string;
  officialAnswers: string[];
  correctLetter: "A" | "B" | "C" | "D";
  correctIndex: 0 | 1 | 2 | 3;
  reference: string | null;
  figure: string | null;
  difficulty: "beginner" | "intermediate" | "advanced" | string;
  hint: string;
  acronyms: string[];
  headlineCorrect: string;
  headlineIncorrect: string;
  correctAnswerText: string;
  eli5: string;
  whyItMatters: string;
  misconception: string;
  wrongAnswerClarification: string;
  visualPrompt: string;
  tags: string[];
};

type Dataset = {
  metadata: {
    questionCount: number;
    categoryMap: Record<string, string>;
    countsBySubelement: Record<string, number>;
  };
  questions: Question[];
};

const dataset = data as unknown as Dataset;

export const allQuestions: Question[] = dataset.questions;
export const categoryMap = dataset.metadata.categoryMap;

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Real Technician exam: 35 questions, one from each group when possible. */
export function buildPracticeExam(): Question[] {
  const byGroup: Record<string, Question[]> = {};
  for (const q of allQuestions) {
    (byGroup[q.group] ??= []).push(q);
  }
  const picked: Question[] = [];
  for (const group of Object.keys(byGroup).sort()) {
    const pool = shuffle(byGroup[group]);
    if (pool[0]) picked.push(pool[0]);
  }
  return shuffle(picked).slice(0, 35);
}

export function pickLearnQuestion(seed?: number): Question {
  if (seed === undefined) {
    return allQuestions[Math.floor(Math.random() * allQuestions.length)];
  }
  return allQuestions[seed % allQuestions.length];
}
