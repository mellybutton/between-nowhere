import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { buildPracticeExam, type Question } from "@/lib/questions";

export const Route = createFileRoute("/_app/practice")({
  component: PracticePage,
});

type Phase = "intro" | "running" | "results";

function PracticePage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [exam, setExam] = useState<Question[]>(() => buildPracticeExam());
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array.from({ length: 35 }, () => null),
  );
  const [selected, setSelected] = useState<number | null>(null);

  const current = exam[index];
  const total = exam.length;

  const score = useMemo(
    () =>
      answers.reduce<number>(
        (acc, a, i) => (a !== null && a === exam[i].correctIndex ? acc + 1 : acc),
        0,
      ),
    [answers, exam],
  );

  const weakCategories = useMemo(() => {
    const missed: Record<string, number> = {};
    answers.forEach((a, i) => {
      if (a === null || a !== exam[i].correctIndex) {
        missed[exam[i].category] = (missed[exam[i].category] ?? 0) + 1;
      }
    });
    return Object.entries(missed)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat);
  }, [answers, exam]);

  function start() {
    setExam(buildPracticeExam());
    setAnswers(Array.from({ length: 35 }, () => null));
    setIndex(0);
    setSelected(null);
    setPhase("running");
  }

  function submitAnswer() {
    if (selected === null) return;
    const next = [...answers];
    next[index] = selected;
    setAnswers(next);
    setSelected(null);
    if (index + 1 >= total) {
      setPhase("results");
    } else {
      setIndex(index + 1);
    }
  }

  if (phase === "intro") {
    return <PracticeIntro onStart={start} />;
  }

  if (phase === "results") {
    return (
      <ResultsScreen
        score={score}
        total={total}
        weakCategories={weakCategories}
        onRetry={start}
      />
    );
  }

  const progress = ((index + 1) / total) * 100;

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-10">
      {/* Progress */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          Question {index + 1} of {total}
        </span>
        <span>{current.category}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="mt-8 font-display text-2xl leading-snug text-foreground">
        {current.officialQuestion}
      </h2>

      <ul className="mt-7 space-y-3">
        {current.officialAnswers.map((answer, i) => {
          const isSelected = selected === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                className={`flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left text-[15px] leading-snug transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border/60 bg-card/60 hover:border-border"
                }`}
              >
                <span className="mt-[2px] text-sm font-medium text-muted-foreground">
                  {String.fromCharCode(65 + i)}.
                </span>
                <span>{answer}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="mt-8">
        <button
          type="button"
          onClick={submitAnswer}
          disabled={selected === null}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-15px_oklch(0.62_0.18_275/0.8)] transition-all disabled:cursor-not-allowed disabled:opacity-40"
        >
          {index + 1 === total ? "Finish" : "Next"}{" "}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function PracticeIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-5xl">🎯</p>
      <h1 className="mt-5 font-display text-3xl text-foreground">
        Practice Exam
      </h1>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
        35 questions, randomly drawn from every Technician group — just like the
        real exam.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-10 inline-flex h-14 w-64 items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-15px_oklch(0.62_0.18_275/0.8)] transition-transform hover:scale-[1.02]"
      >
        Begin <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-4 text-xs italic text-muted-foreground/80">
        Pass mark: 26 / 35
      </p>
    </section>
  );
}

function ResultsScreen({
  score,
  total,
  weakCategories,
  onRetry,
}: {
  score: number;
  total: number;
  weakCategories: string[];
  onRetry: () => void;
}) {
  const passed = score >= 26;
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 pt-12 text-center">
      <p className="text-5xl">{passed ? "📡" : "🛰️"}</p>
      <h1 className="mt-5 font-display text-3xl text-foreground">
        {passed ? "You're tracking." : "Something just clicked."}
      </h1>
      <p className="mt-3 font-display text-5xl text-accent-foreground">
        {score} <span className="text-muted-foreground">/ {total}</span>
      </p>
      <p className="mt-3 max-w-xs text-sm text-muted-foreground">
        {passed
          ? "Passing range — you'd clear the real exam today."
          : "A couple things just need another pass."}
      </p>

      {weakCategories.length > 0 && (
        <div className="mt-8 w-full rounded-2xl border border-border/40 bg-card/60 p-5 text-left">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Worth revisiting
          </p>
          <ul className="mt-3 space-y-2">
            {weakCategories.map((c) => (
              <li
                key={c}
                className="rounded-xl bg-muted/60 px-4 py-3 text-sm text-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/review"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-card/40 text-sm font-medium text-foreground transition-colors hover:bg-card"
      >
        <RotateCcw className="h-4 w-4" /> Review weak spots
      </Link>

      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-15px_oklch(0.62_0.18_275/0.8)] transition-all"
      >
        Try again <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
