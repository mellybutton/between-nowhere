import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { learnFlowConcepts, type LearnConcept } from "@/data/learnFlow";
import {
  useConceptProgress,
  useRecordConcept,
  deriveProgressStats,
} from "@/lib/progress";
import { buildShuffledAnswers, type DisplayAnswer, isDev } from "@/lib/answers";
import { trackLearnEvent } from "@/lib/learn-events";
import { StarField } from "@/components/illustrations/StarField";
import { AmbientParticles } from "@/components/illustrations/AmbientParticles";
import {
  StatementStep,
  InsightStep,
  QuestionStep,
  RevealStep,
  TransitionStep,
} from "@/components/learn/LearnSteps";
import heroBg from "@/assets/hero-night.webp";

export const Route = createFileRoute("/_authenticated/learn")({
  component: LearnPage,
});

type Phase = "hook" | "insight" | "question" | "reveal" | "transition";

function LearnPage() {
  const navigate = useNavigate();
  const { data: rows } = useConceptProgress();
  const [sessionCompletedIds, setSessionCompletedIds] = useState<Set<string>>(
    () => new Set(),
  );
  const recordConcept = useRecordConcept();
  const completingRef = useRef(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const completedIds = useMemo(() => {
    const ids = new Set(
      (rows ?? [])
        .filter((r) => r.status === "completed")
        .map((r) => r.concept_id),
    );
    sessionCompletedIds.forEach((id) => ids.add(id));
    return ids;
  }, [rows, sessionCompletedIds]);

  const stats = useMemo(() => {
    const optimisticRows = [
      ...(rows ?? []),
      ...[...sessionCompletedIds]
        .filter(
          (id) =>
            !(rows ?? []).some(
              (r) => r.status === "completed" && r.concept_id === id,
            ),
        )
        .map((id) => ({
          id: `session-${id}`,
          user_id: "session",
          concept_id: id,
          status: "completed" as const,
          attempts: 1,
          was_correct_first_try: null,
          completed_at: new Date(0).toISOString(),
        })),
    ];
    return deriveProgressStats(optimisticRows);
  }, [rows, sessionCompletedIds]);

  // The next concept derived purely from progress data. This can change
  // mid-session as the cache refetches, so we MUST NOT bind the screen
  // directly to it — instead we pin `activeConcept` below.
  const nextConcept = useMemo<LearnConcept | null>(
    () => learnFlowConcepts.find((c) => !completedIds.has(c.id)) ?? null,
    [completedIds],
  );

  // Pin the concept the user is currently working through. Only advances
  // when `next()` is called explicitly — never silently swapped by a
  // background refetch. This is what fixes the "stuck on success" loop.
  const [activeConcept, setActiveConcept] = useState<LearnConcept | null>(null);
  const progressReady = rows !== undefined;

  // First time data arrives (or after we clear active to advance), adopt
  // whatever the derived next concept is.
  useEffect(() => {
    if (progressReady && activeConcept === null && nextConcept !== null) {
      setActiveConcept(nextConcept);
    }
  }, [activeConcept, nextConcept, progressReady]);

  const concept = activeConcept;

  const [phase, setPhase] = useState<Phase>("hook");
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [wasCorrectFirstTry, setWasCorrectFirstTry] = useState<boolean | null>(
    null,
  );
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [sessionStreak, setSessionStreak] = useState(0);

  // Shuffle answers for the current concept. Re-shuffle when the concept changes.
  const [displayAnswers, setDisplayAnswers] = useState<DisplayAnswer[]>([]);
  useEffect(() => {
    if (concept) {
      setDisplayAnswers(
        buildShuffledAnswers(concept.answers, concept.correctIndex),
      );
    }
  }, [concept?.id]);

  // Funnel tracking: fire a *_shown event each time the user lands on a phase
  // for the current concept. Action events (answer_submitted, concept_completed,
  // success_dismissed, concept_advanced) fire from their handlers below.
  useEffect(() => {
    if (!concept) return;
    const eventForPhase: Partial<Record<Phase, "hook_shown" | "insight_shown" | "question_shown">> = {
      hook: "hook_shown",
      insight: "insight_shown",
      question: "question_shown",
    };
    const evt = eventForPhase[phase];
    if (!evt) return;
    void trackLearnEvent({
      event: evt,
      conceptId: concept.id,
      stage: concept.stage,
    });
  }, [phase, concept?.id]);

  // Fire flow_completed once when the user reaches the "all done" screen.
  // Guarded by activeConcept === null + completed rows so this never fires
  // on initial mount before data has loaded.
  const completedCount = completedIds.size;
  const flowComplete =
    activeConcept === null &&
    completedCount >= learnFlowConcepts.length &&
    rows !== undefined;
  useEffect(() => {
    if (!flowComplete) return;
    void trackLearnEvent({ event: "flow_completed" });
  }, [flowComplete]);

  // Long-running streak: completed concepts where first try was correct, in order.
  const baseStreak = useMemo(() => {
    const completed = (rows ?? [])
      .filter((r) => r.status === "completed")
      .sort((a, b) => {
        const at = a.completed_at ?? "";
        const bt = b.completed_at ?? "";
        return bt.localeCompare(at);
      });
    let n = 0;
    for (const r of completed) {
      if (r.was_correct_first_try) n += 1;
      else break;
    }
    return n;
  }, [rows]);

  const currentStreak = baseStreak + sessionStreak;

  if ((!progressReady && !concept) || (!concept && nextConcept)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!concept) {
    return (
      <div
        data-testid="learn-flow-complete"
        className="mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-6 text-center"
      >
        <p className="text-5xl">🛰️</p>
        <h1 className="mt-5 font-narrative text-3xl text-foreground">
          Every signal received.
        </h1>
        <p className="mt-3 max-w-xs font-interface text-sm leading-relaxed text-muted-foreground">
          Practice exams from here — that's the only thing left between you and
          the test.
        </p>
        <Link
          to="/practice"
          data-testid="learn-go-practice"
          className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground"
        >
          Take a practice exam <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  function reset() {
    setPhase("hook");
    setSelected(null);
    setShowHint(false);
    setWasCorrectFirstTry(null);
    setWrongAttempts(0);
  }

  function submitAnswer() {
    if (selected === null) return;
    // Evaluate against isCorrect on the displayed answer — never positional.
    const correct = displayAnswers[selected]?.isCorrect === true;
    void trackLearnEvent({
      event: "answer_submitted",
      conceptId: concept!.id,
      stage: concept!.stage,
      metadata: {
        correct,
        attempt: wrongAttempts + 1,
        first_try_evaluated: wasCorrectFirstTry === null,
      },
    });
    if (wasCorrectFirstTry === null) {
      setWasCorrectFirstTry(correct);
    }
    if (correct) {
      setPhase("reveal");
    } else {
      setWrongAttempts((n) => n + 1);
      setTimeout(() => setSelected(null), 600);
    }
  }

  async function complete() {
    // Single "advance" handler from the reveal screen. Records progress,
    // fires telemetry, and moves directly to the next concept — no second
    // success/transition screen in between (that was the "two success
    // screens" UX bug).
    if (completingRef.current) return;
    completingRef.current = true;
    setIsCompleting(true);
    const firstTry = wasCorrectFirstTry ?? false;
    const completedConceptId = concept!.id;
    const completedStage = concept!.stage;
    await recordConcept.mutateAsync({
      conceptId: completedConceptId,
      wasCorrectFirstTry: firstTry,
    });
    void trackLearnEvent({
      event: "concept_completed",
      conceptId: completedConceptId,
      stage: completedStage,
      metadata: {
        first_try: firstTry,
        wrong_attempts: wrongAttempts,
        used_hint: showHint,
      },
    });
    void trackLearnEvent({
      event: "concept_advanced",
      conceptId: completedConceptId,
      stage: completedStage,
    });
    void trackLearnEvent({
      event: "success_dismissed",
      conceptId: completedConceptId,
      stage: completedStage,
    });
    if (firstTry) {
      setSessionStreak((n) => n + 1);
    } else {
      setSessionStreak(0);
    }
    const nextCompletedIds = new Set(completedIds);
    nextCompletedIds.add(completedConceptId);
    const upcomingConcept =
      learnFlowConcepts.find((c) => !nextCompletedIds.has(c.id)) ?? null;
    setSessionCompletedIds((ids) => new Set(ids).add(completedConceptId));
    reset();
    setActiveConcept(upcomingConcept);
    setIsCompleting(false);
    completingRef.current = false;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-95"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-background/60" />
      <StarField density={15} />
      <AmbientParticles count={10} />

      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-background/30">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-accent"
          initial={{ width: 0 }}
          animate={{ width: `${stats.percent}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <button
        type="button"
        onClick={() => navigate({ to: "/home" })}
        className="absolute left-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground backdrop-blur-md transition-colors hover:bg-background/60"
        aria-label="Back"
      >
        <ArrowLeft className="h-4 w-4" />
      </button>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-6 pb-24 pt-24">
        <AnimatePresence mode="wait">
          {phase === "hook" && (
            <StatementStep
              key="hook"
              text={concept.hook}
              conceptId={concept.id}
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
              displayAnswers={displayAnswers}
              selected={selected}
              setSelected={setSelected}
              showHint={showHint}
              setShowHint={(v) => {
                if (v && !showHint) {
                  void trackLearnEvent({
                    event: "hint_revealed",
                    conceptId: concept.id,
                    stage: concept.stage,
                  });
                }
                setShowHint(v);
              }}
              onSubmit={submitAnswer}
              percent={stats.percent}
              wrongAttempts={wrongAttempts}
              streak={currentStreak}
            />
          )}
          {phase === "reveal" && (
            <RevealStep
              key="reveal"
              concept={concept}
              onContinue={complete}
              percent={stats.percent}
              isFirstTry={wasCorrectFirstTry === true}
              loading={recordConcept.isPending || isCompleting}
              streak={currentStreak + (wasCorrectFirstTry ? 1 : 0)}
            />
          )}
          {phase === "transition" && (
            <TransitionStep
              key="transition"
              text={concept.continueText}
              conceptId={concept.id}
              onContinue={next}
              percent={stats.percent}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
