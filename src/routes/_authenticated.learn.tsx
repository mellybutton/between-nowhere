import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Lightbulb, Check } from "lucide-react";
import { learnFlowConcepts, type LearnConcept } from "@/data/learnFlow";
import { acronymExpansions } from "@/lib/acronyms";
import {
  useConceptProgress,
  useRecordConcept,
  deriveProgressStats,
} from "@/lib/progress";
import { StarField } from "@/components/illustrations/StarField";
import { AmbientParticles } from "@/components/illustrations/AmbientParticles";
import { ConceptIllustration, hasIllustration } from "@/components/illustrations/ConceptIllustrations";
import heroBg from "@/assets/hero-night.png";

export const Route = createFileRoute("/_authenticated/learn")({
  component: LearnPage,
});

type Phase = "hook" | "insight" | "question" | "reveal" | "transition";

function LearnPage() {
  const navigate = useNavigate();
  const { data: rows } = useConceptProgress();
  const stats = deriveProgressStats(rows);
  const recordConcept = useRecordConcept();

  // Find current concept (next not-completed in staged order)
  const completedIds = useMemo(
    () =>
      new Set(
        (rows ?? [])
          .filter((r) => r.status === "completed")
          .map((r) => r.concept_id),
      ),
    [rows],
  );

  const concept = useMemo<LearnConcept | null>(
    () => learnFlowConcepts.find((c) => !completedIds.has(c.id)) ?? null,
    [completedIds],
  );

  const [phase, setPhase] = useState<Phase>("hook");
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [wasCorrectFirstTry, setWasCorrectFirstTry] = useState<boolean | null>(
    null,
  );

  if (!concept) {
    return (
      <div className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-6 text-center">
        <p className="text-5xl">🛰️</p>
        <h1 className="mt-5 font-narrative text-3xl text-foreground">
          You've reached every signal.
        </h1>
        <p className="mt-3 max-w-xs font-interface text-sm text-muted-foreground">
          Time to test what you know.
        </p>
        <Link
          to="/practice"
          className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground"
        >
          Take a practice exam <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const isCorrect = selected !== null && selected === concept.correctIndex;

  function reset() {
    setPhase("hook");
    setSelected(null);
    setShowHint(false);
    setWasCorrectFirstTry(null);
  }

  function submitAnswer() {
    if (selected === null) return;
    const correct = selected === concept!.correctIndex;
    if (wasCorrectFirstTry === null) {
      setWasCorrectFirstTry(correct);
    }
    if (correct) {
      setPhase("reveal");
    } else {
      // Allow retry — clear selection but stay on question
      setTimeout(() => setSelected(null), 600);
    }
  }

  async function complete() {
    await recordConcept.mutateAsync({
      conceptId: concept!.id,
      wasCorrectFirstTry: wasCorrectFirstTry ?? false,
    });
    setPhase("transition");
  }

  function next() {
    reset();
    // Stats will refresh via query invalidation
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/35 via-background/55 to-background/85" />
      <StarField density={15} />
      <AmbientParticles count={10} />

      {/* Top progress bar */}
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-background/30">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-accent"
          initial={{ width: 0 }}
          animate={{ width: `${stats.percent}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate({ to: "/home" })}
        className="absolute left-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground backdrop-blur-md transition-colors hover:bg-background/60"
        aria-label="Back"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pt-20">
        <AnimatePresence mode="wait">
          {phase === "hook" && (
            <StatementStep
              key="hook"
              text={concept.hook}
              onContinue={() => setPhase("insight")}
              percent={stats.percent}
            />
          )}
          {phase === "insight" && (
            <InsightStep
              key="insight"
              conceptId={concept.id}
              text={concept.insight}
              onContinue={() => setPhase("question")}
              percent={stats.percent}
            />
          )}
          {phase === "question" && (
            <QuestionStep
              key="question"
              concept={concept}
              selected={selected}
              setSelected={setSelected}
              showHint={showHint}
              setShowHint={setShowHint}
              onSubmit={submitAnswer}
              percent={stats.percent}
              attemptedWrong={wasCorrectFirstTry === false}
            />
          )}
          {phase === "reveal" && (
            <RevealStep
              key="reveal"
              concept={concept}
              onContinue={complete}
              percent={stats.percent}
              isFirstTry={wasCorrectFirstTry === true}
              loading={recordConcept.isPending}
            />
          )}
          {phase === "transition" && (
            <TransitionStep
              key="transition"
              text={concept.continueText}
              onContinue={next}
              percent={stats.percent}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SignalFooter({ percent }: { percent: number }) {
  return (
    <p className="mt-auto pb-6 text-center font-interface text-sm text-muted-foreground">
      Signal strength{" "}
      <span className="font-medium text-primary-accent">{percent}%</span>
    </p>
  );
}

function StatementStep({
  text,
  onContinue,
  percent,
}: {
  text: string;
  onContinue: () => void;
  percent: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6 }}
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 items-center justify-center">
        <h2 className="font-narrative text-[34px] leading-[1.15] text-foreground sm:text-4xl">
          {text}
        </h2>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="mx-auto mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-10 text-base font-medium text-foreground backdrop-blur-md transition-colors hover:bg-primary/20"
      >
        Continue <ArrowRight className="h-4 w-4" />
      </button>
      <SignalFooter percent={percent} />
    </motion.div>
  );
}

function InsightStep({
  conceptId,
  text,
  onContinue,
  percent,
}: {
  conceptId: string;
  text: string;
  onContinue: () => void;
  percent: number;
}) {
  const showIllo = hasIllustration(conceptId);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6 }}
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 flex-col justify-center">
        {showIllo && <ConceptIllustration conceptId={conceptId} />}
        <p className="font-interface text-xs uppercase tracking-[0.18em] text-primary-accent">
          Why this matters
        </p>
        <h2 className="mt-3 font-narrative text-[28px] leading-[1.2] text-foreground sm:text-3xl">
          {text}
        </h2>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="mx-auto mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-10 text-base font-medium text-foreground backdrop-blur-md transition-colors hover:bg-primary/20"
      >
        Next <ArrowRight className="h-4 w-4" />
      </button>
      <SignalFooter percent={percent} />
    </motion.div>
  );
}
  text,
  onContinue,
  percent,
}: {
  text: string;
  onContinue: () => void;
  percent: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-1 flex-col"
    >
      <div className="flex flex-1 items-center justify-center">
        <p className="font-narrative text-2xl italic leading-relaxed text-foreground/85 sm:text-[26px]">
          {text}
        </p>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="mx-auto mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-10 text-base font-medium text-primary-foreground"
      >
        Next concept <ArrowRight className="h-4 w-4" />
      </button>
      <SignalFooter percent={percent} />
    </motion.div>
  );
}

function QuestionStep({
  concept,
  selected,
  setSelected,
  showHint,
  setShowHint,
  onSubmit,
  percent,
  attemptedWrong,
}: {
  concept: LearnConcept;
  selected: number | null;
  setSelected: (n: number | null) => void;
  showHint: boolean;
  setShowHint: (s: boolean) => void;
  onSubmit: () => void;
  percent: number;
  attemptedWrong: boolean;
}) {
  const acronymHint = concept.acronym ? acronymExpansions[concept.acronym] : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col"
    >
      <h2 className="font-narrative text-[26px] leading-snug text-foreground sm:text-3xl">
        {concept.question}
      </h2>
      {(concept.acronym || acronymHint) && (
        <p className="mt-2 font-interface text-sm text-muted-foreground">
          {concept.acronym}
          {acronymHint ? ` (${acronymHint})` : ""}
        </p>
      )}

      <button
        type="button"
        onClick={() => setShowHint(!showHint)}
        className="mt-6 flex w-full items-center justify-between rounded-2xl border border-border/40 bg-card/40 px-4 py-3.5 text-left font-interface text-sm transition-colors hover:bg-card/60"
      >
        <span className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-4 w-4 text-primary-accent" strokeWidth={1.75} />
          {showHint ? "Hide hint" : "Need a hint?"}
        </span>
        <span className="text-muted-foreground">{showHint ? "−" : "▾"}</span>
      </button>
      {showHint && concept.hint && (
        <p className="mt-2 rounded-2xl border border-border/40 bg-card/30 px-4 py-3 font-interface text-sm leading-relaxed text-muted-foreground">
          {concept.hint}
        </p>
      )}

      {attemptedWrong && (
        <p className="mt-3 font-interface text-xs italic text-destructive/80">
          Not quite — give it another look.
        </p>
      )}

      <ul className="mt-5 flex-1 space-y-3">
        {concept.answers.map((answer, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSelected = selected === i;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => setSelected(i)}
                className={`flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left font-interface text-[15px] leading-snug transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border/40 bg-card/30 text-foreground hover:border-border/80"
                }`}
              >
                <span className="mt-[2px] text-sm font-medium text-muted-foreground">
                  {letter}.
                </span>
                <span>{answer}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        onClick={onSubmit}
        disabled={selected === null}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
      >
        Submit <ArrowRight className="h-4 w-4" />
      </button>
      <SignalFooter percent={percent} />
    </motion.div>
  );
}

function RevealStep({
  concept,
  onContinue,
  percent,
  isFirstTry,
  loading,
}: {
  concept: LearnConcept;
  onContinue: () => void;
  percent: number;
  isFirstTry: boolean;
  loading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col"
    >
      <div className="rounded-2xl border border-success/40 bg-success/10 px-5 py-5">
        <h2 className="font-narrative text-3xl leading-tight text-success">
          {isFirstTry ? concept.headlineCorrect : "Got there."}
        </h2>
      </div>

      <div className="mt-4 rounded-2xl border border-border/40 bg-card/40 px-5 py-4">
        <p className="flex items-center gap-2 font-interface text-xs uppercase tracking-wider text-muted-foreground">
          <Check className="h-3.5 w-3.5 text-success" strokeWidth={2.5} />
          Correct answer
        </p>
        <p className="mt-2 font-interface text-base leading-snug text-foreground">
          {concept.correctAnswerText}
        </p>
      </div>

      <div className="mt-3 rounded-2xl border border-border/40 bg-card/40 px-5 py-4">
        <p className="font-interface text-xs uppercase tracking-wider text-muted-foreground">
          In other words
        </p>
        <p className="mt-2 font-interface text-base leading-relaxed text-foreground">
          {concept.eli5}
        </p>
      </div>

      {concept.whyItMatters && (
        <p className="mt-3 rounded-2xl border border-border/30 bg-card/20 px-5 py-3 font-interface text-sm italic leading-relaxed text-muted-foreground">
          {concept.whyItMatters}
        </p>
      )}

      <button
        type="button"
        onClick={onContinue}
        disabled={loading}
        className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground disabled:opacity-50"
      >
        Continue
      </button>
      <SignalFooter percent={percent} />
    </motion.div>
  );
}
