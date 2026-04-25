import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Lightbulb, Check, Flame, Sparkles } from "lucide-react";
import { acronymExpansions } from "@/lib/acronyms";
import type { LearnConcept } from "@/data/learnFlow";
import {
  ConceptIllustration,
  hasIllustration,
} from "@/components/illustrations/ConceptIllustrations";
import {
  correctAnswerCopy,
  wrongAttemptCopy,
  explanationBridge,
} from "@/lib/feedback-voice";

export function SignalFooter({
  percent,
  streak,
}: {
  percent: number;
  streak?: number;
}) {
  return (
    <div className="mt-6 flex items-center justify-center gap-3 pb-2 pt-2">
      <p className="text-center font-interface text-xs text-muted-foreground">
        Signal strength{" "}
        <span className="font-medium text-primary-accent">{percent}%</span>
      </p>
      {streak !== undefined && streak >= 2 && (
        <span className="flex items-center gap-1 rounded-full border border-primary-accent/30 bg-primary/10 px-2 py-0.5 font-interface text-[10px] text-primary-accent">
          <Flame className="h-3 w-3" strokeWidth={2} />
          {streak} streak
        </span>
      )}
    </div>
  );
}

export function StatementStep({
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

export function InsightStep({
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

export function TransitionStep({
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

export function QuestionStep({
  concept,
  selected,
  setSelected,
  showHint,
  setShowHint,
  onSubmit,
  percent,
  wrongAttempts,
  streak,
}: {
  concept: LearnConcept;
  selected: number | null;
  setSelected: (n: number | null) => void;
  showHint: boolean;
  setShowHint: (s: boolean) => void;
  onSubmit: () => void;
  percent: number;
  wrongAttempts: number;
  streak?: number;
}) {
  const acronymHint = concept.acronym ? acronymExpansions[concept.acronym] : null;
  const wrongCopy = wrongAttempts > 0 ? wrongAttemptCopy({ attempt: wrongAttempts }) : null;
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

      <AnimatePresence>
        {wrongCopy && (
          <motion.div
            key={`wrong-${wrongAttempts}`}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 rounded-2xl border border-border/40 bg-card/30 px-4 py-3"
          >
            <p className="font-interface text-sm font-medium text-foreground">
              {wrongCopy.headline}
            </p>
            {wrongCopy.body && (
              <p className="mt-1 font-interface text-[13px] leading-relaxed text-muted-foreground">
                {wrongCopy.body}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
      <SignalFooter percent={percent} streak={streak} />
    </motion.div>
  );
}

export function RevealStep({
  concept,
  onContinue,
  percent,
  isFirstTry,
  loading,
  streak,
}: {
  concept: LearnConcept;
  onContinue: () => void;
  percent: number;
  isFirstTry: boolean;
  loading: boolean;
  streak: number;
}) {
  const voice = correctAnswerCopy({ isFirstTry, streak });
  const isMomentum = streak >= 3;
  const bridge = !isFirstTry ? explanationBridge() : "In other words";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-2xl border border-success/40 bg-success/10 px-5 py-5"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-narrative text-3xl leading-tight text-success">
            {isFirstTry ? voice.headline : voice.headline}
          </h2>
          {isMomentum && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="flex shrink-0 items-center gap-1 rounded-full border border-success/40 bg-success/15 px-2.5 py-1 font-interface text-[11px] font-medium text-success"
            >
              <Sparkles className="h-3 w-3" strokeWidth={2.25} />
              {streak}× clean
            </motion.span>
          )}
        </div>
        {voice.body && (
          <p className="mt-2 font-interface text-sm leading-relaxed text-success/85">
            {voice.body}
          </p>
        )}
      </motion.div>

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
          {bridge}
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
      <SignalFooter percent={percent} streak={streak} />
    </motion.div>
  );
}
