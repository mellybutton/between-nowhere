import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Radio,
} from "lucide-react";
import { buildPracticeExam, type Question, categoryMap } from "@/lib/questions";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import {
  usePracticeHistory,
  useMomentum,
} from "@/lib/momentum";
import {
  examResultCopy,
  readinessCopy,
  emptyStates,
} from "@/lib/feedback-voice";

export const Route = createFileRoute("/_authenticated/practice")({
  component: PracticePage,
});

type Phase = "intro" | "running" | "results";

const PASS_MARK = 26;

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
  const { data: history } = usePracticeHistory(5);
  const momentum = useMomentum();
  const hasHistory = (history?.length ?? 0) > 0;

  const readiness =
    momentum.recentAvg !== null && momentum.practiceCount >= 3
      ? readinessCopy({
          recentAvg: momentum.recentAvg,
          total: momentum.total,
          passMark: momentum.passMark,
        })
      : null;

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-10">
      <div className="text-center">
        <p className="font-interface text-xs uppercase tracking-[0.18em] text-primary-accent">
          Practice exam
        </p>
        <h1 className="mt-3 font-narrative text-4xl leading-tight text-foreground">
          35 questions.
          <br />
          Real conditions.
        </h1>
        <p className="mx-auto mt-4 max-w-xs font-interface text-sm leading-relaxed text-muted-foreground">
          Drawn at random from every Technician group — exactly like the FCC
          exam. Pass mark: <span className="text-foreground">{PASS_MARK} / 35</span>.
        </p>
      </div>

      {readiness && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-7 rounded-2xl border border-success/40 bg-success/10 p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-success/40 bg-success/15 text-success">
              <Sparkles className="h-4 w-4" strokeWidth={2} />
            </div>
            <div>
              <p className="font-narrative text-xl leading-tight text-success">
                {readiness.headline}
              </p>
              {readiness.body && (
                <p className="mt-1 font-interface text-[13px] leading-relaxed text-success/85">
                  {readiness.body}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {!hasHistory && !readiness && (
        <div className="mt-7 rounded-2xl border border-border/40 bg-card/40 p-5 text-center">
          <p className="font-narrative text-lg text-foreground">
            {emptyStates.practiceFresh.headline}
          </p>
          <p className="mt-1 font-interface text-[13px] leading-relaxed text-muted-foreground">
            {emptyStates.practiceFresh.body}
          </p>
        </div>
      )}

      {hasHistory && (
        <div className="mt-7">
          <p className="font-interface text-xs uppercase tracking-[0.16em] text-muted-foreground">
            Recent attempts
          </p>
          <ul className="mt-3 space-y-2">
            {history!.slice(0, 3).map((a) => {
              const passed = a.score >= PASS_MARK;
              return (
                <li
                  key={a.id}
                  className="flex items-center justify-between rounded-xl border border-border/40 bg-card/30 px-4 py-3"
                >
                  <span className="font-interface text-[13px] text-muted-foreground">
                    {new Date(a.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-interface text-[13px] font-mono-numeric text-foreground">
                      {a.score} / {a.total}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 font-interface text-[10px] uppercase tracking-wider ${
                        passed
                          ? "border border-success/40 bg-success/10 text-success"
                          : "border border-border/40 bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {passed ? "Pass" : "Below"}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <button
        type="button"
        onClick={onStart}
        className="mt-10 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground"
      >
        {hasHistory ? "Take another" : "Begin"}{" "}
        <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-3 pb-6 text-center font-interface text-[12px] italic text-muted-foreground/80">
        Saves automatically when you finish.
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
  const passed = score >= PASS_MARK;
  const momentum = useMomentum();

  // The just-saved attempt may or may not be in momentum yet — use the
  // priorBest from history so the comparison reflects what came before.
  const voice = examResultCopy({
    score,
    total,
    passMark: PASS_MARK,
    bestPrior: momentum.priorBest,
  });

  const improved =
    momentum.priorBest !== null && score > momentum.priorBest;

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-interface text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {passed ? "Above the line" : "Below the line"}
        </p>
        <h1 className="mt-3 font-narrative text-[34px] leading-tight text-foreground">
          {voice.headline}
        </h1>
        {voice.body && (
          <p className="mx-auto mt-3 max-w-xs font-interface text-sm leading-relaxed text-muted-foreground">
            {voice.body}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-8 overflow-hidden rounded-3xl border p-6 text-center ${
          passed
            ? "border-success/40 bg-success/10"
            : "border-border/40 bg-card/40"
        }`}
      >
        <p className="font-narrative text-[64px] leading-none text-foreground font-mono-numeric">
          <span className={passed ? "text-success" : "text-primary-accent"}>
            {score}
          </span>
          <span className="text-muted-foreground"> / {total}</span>
        </p>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="font-interface text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
            Pass mark · {PASS_MARK}
          </span>
          {improved && (
            <span className="flex items-center gap-1 rounded-full border border-primary-accent/30 bg-primary/10 px-2.5 py-1 font-interface text-[11px] text-primary-accent">
              <TrendingUp className="h-3 w-3" strokeWidth={2} />
              up from {momentum.priorBest}
            </span>
          )}
          {momentum.plateau && !passed && (
            <span className="rounded-full border border-border/40 bg-muted/50 px-2.5 py-1 font-interface text-[11px] text-muted-foreground">
              plateau
            </span>
          )}
        </div>
        {/* Score bar */}
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-background/40">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(score / total) * 100}%` }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${
              passed
                ? "bg-gradient-to-r from-success/70 to-success"
                : "bg-gradient-to-r from-primary/70 to-primary-accent"
            }`}
          />
        </div>
      </motion.div>

      {weakCategories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 w-full rounded-2xl border border-border/40 bg-card/40 p-5"
        >
          <p className="flex items-center gap-2 font-interface text-xs uppercase tracking-wider text-muted-foreground">
            <Radio className="h-3 w-3" strokeWidth={1.75} />
            Where the signal got fuzzy
          </p>
          <ul className="mt-3 space-y-2">
            {weakCategories.map((c) => (
              <li
                key={c}
                className="rounded-xl bg-muted/60 px-4 py-3 font-interface text-sm text-foreground"
              >
                {categoryMap[c] ?? c}
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      <Link
        to="/learn"
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-card/30 font-interface text-sm font-medium text-foreground transition-colors hover:bg-card/50"
      >
        <RotateCcw className="h-4 w-4" /> Revisit weak spots
      </Link>

      <button
        type="button"
        onClick={onRetry}
        className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground"
      >
        Take another <ArrowRight className="h-4 w-4" />
      </button>
      <p className="mt-4 pb-6 text-center font-interface text-[12px] italic text-muted-foreground/80">
        {passed
          ? "You've got the rhythm. Keep it warm."
          : "No score is wasted — every attempt sharpens the next."}
      </p>
    </section>
  );
}
