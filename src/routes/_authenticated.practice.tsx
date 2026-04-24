import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { buildPracticeExam, type Question } from "@/lib/questions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/_authenticated/practice")({
  component: PracticePage,
});

type Phase = "intro" | "running" | "results";

function PracticePage() {
  const { user } = useAuth();
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
        (acc, a, i) =>
          a !== null && a === exam[i].correctIndex ? acc + 1 : acc,
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
    const fresh = buildPracticeExam();
    setExam(fresh);
    setAnswers(Array.from({ length: fresh.length }, () => null));
    setIndex(0);
    setSelected(null);
    setPhase("running");
  }

  async function submitAnswer() {
    if (selected === null) return;
    const next = [...answers];
    next[index] = selected;
    setAnswers(next);
    setSelected(null);
    if (index + 1 >= total) {
      // Save attempt
      if (user) {
        const finalScore = next.reduce<number>(
          (acc, a, i) =>
            a !== null && a === exam[i].correctIndex ? acc + 1 : acc,
          0,
        );
        const finalWeak = (() => {
          const missed: Record<string, number> = {};
          next.forEach((a, i) => {
            if (a === null || a !== exam[i].correctIndex) {
              missed[exam[i].category] =
                (missed[exam[i].category] ?? 0) + 1;
            }
          });
          return Object.entries(missed)
            .sort((x, y) => y[1] - x[1])
            .slice(0, 3)
            .map(([c]) => c);
        })();
        await supabase.from("practice_attempts").insert({
          user_id: user.id,
          score: finalScore,
          total: exam.length,
          weak_categories: finalWeak,
          question_ids: exam.map((q) => q.id),
          answers: next as unknown as Record<string, number>,
        });
      }
      setPhase("results");
    } else {
      setIndex(index + 1);
    }
  }

  if (phase === "intro") return <PracticeIntro onStart={start} />;
  if (phase === "results")
    return (
      <ResultsScreen
        score={score}
        total={total}
        weakCategories={weakCategories}
        onRetry={start}
      />
    );

  const progress = ((index + 1) / total) * 100;
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-10">
      <div className="flex items-center justify-between font-interface text-xs text-muted-foreground">
        <span>
          Question {index + 1} of {total}
        </span>
        <span>{current.category}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <h2 className="mt-8 font-narrative text-2xl leading-snug text-foreground sm:text-[26px]">
        {current.officialQuestion}
      </h2>

      <ul className="mt-7 flex-1 space-y-3">
        {current.officialAnswers.map((answer, i) => {
          const isSelected = selected === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                className={`flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left font-interface text-[15px] leading-snug transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10"
                    : "border-border/40 bg-card/30 hover:border-border/80"
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

      <button
        type="button"
        onClick={submitAnswer}
        disabled={selected === null}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        {index + 1 === total ? "Finish" : "Next"}{" "}
        <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}

function PracticeIntro({ onStart }: { onStart: () => void }) {
  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="text-5xl">🎯</p>
      <h1 className="mt-5 font-narrative text-3xl text-foreground">
        Practice Exam
      </h1>
      <p className="mt-3 max-w-xs font-interface text-sm leading-relaxed text-muted-foreground">
        35 questions, randomly drawn from every Technician group — just like
        the real exam.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="mt-10 inline-flex h-14 w-64 items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground"
      >
        Begin <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-4 font-interface text-xs italic text-muted-foreground/70">
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
      <h1 className="mt-5 font-narrative text-3xl text-foreground">
        {passed ? "You're tracking." : "Something just clicked."}
      </h1>
      <p className="mt-3 font-narrative text-5xl text-primary-accent">
        {score} <span className="text-muted-foreground">/ {total}</span>
      </p>
      <p className="mt-3 max-w-xs font-interface text-sm text-muted-foreground">
        {passed
          ? "Passing range — you'd clear the real exam today."
          : "A couple things just need another pass."}
      </p>

      {weakCategories.length > 0 && (
        <div className="mt-8 w-full rounded-2xl border border-border/40 bg-card/40 p-5 text-left">
          <p className="font-interface text-xs uppercase tracking-wider text-muted-foreground">
            Worth revisiting
          </p>
          <ul className="mt-3 space-y-2">
            {weakCategories.map((c) => (
              <li
                key={c}
                className="rounded-xl bg-muted/60 px-4 py-3 font-interface text-sm text-foreground"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        to="/learn"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-card/30 font-interface text-sm font-medium text-foreground transition-colors hover:bg-card/50"
      >
        <RotateCcw className="h-4 w-4" /> Review weak spots
      </Link>

      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground"
      >
        Try again <ArrowRight className="h-4 w-4" />
      </button>
    </section>
  );
}
