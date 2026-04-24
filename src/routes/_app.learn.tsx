import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import { pickLearnQuestion, type Question } from "@/lib/questions";

export const Route = createFileRoute("/_app/learn")({
  component: LearnPage,
});

function LearnPage() {
  const navigate = useNavigate();
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 10_000));
  const question = useMemo<Question>(() => pickLearnQuestion(seed), [seed]);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect = submitted && selected === question.correctIndex;

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
  }

  function handleNext() {
    setSeed((s) => s + 1);
    setSelected(null);
    setSubmitted(false);
    setShowHint(false);
  }

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-12">
      {/* Category chip */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
          {question.category}
        </span>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {question.id}
        </span>
      </div>

      {/* Question */}
      <h2 className="mt-6 font-display text-2xl leading-snug text-foreground sm:text-[26px]">
        {question.officialQuestion}
      </h2>

      {/* Answers */}
      <ul className="mt-8 space-y-3">
        {question.officialAnswers.map((answer, i) => {
          const letter = String.fromCharCode(65 + i);
          const isSelected = selected === i;
          const isAnswerCorrect = i === question.correctIndex;

          let stateClasses =
            "border-border/60 bg-card/60 hover:border-border hover:bg-card";
          if (submitted) {
            if (isAnswerCorrect) {
              stateClasses =
                "border-success/60 bg-success/10 text-foreground";
            } else if (isSelected) {
              stateClasses =
                "border-destructive/60 bg-destructive/10 text-foreground";
            } else {
              stateClasses = "border-border/40 bg-card/40 opacity-60";
            }
          } else if (isSelected) {
            stateClasses = "border-primary bg-primary/10 text-foreground";
          }

          return (
            <li key={i}>
              <button
                type="button"
                disabled={submitted}
                onClick={() => setSelected(i)}
                className={`flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left text-[15px] leading-snug transition-all ${stateClasses}`}
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

      {/* Hint */}
      {!submitted && (
        <button
          type="button"
          onClick={() => setShowHint((s) => !s)}
          className="mt-5 inline-flex items-center gap-2 self-start text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Lightbulb className="h-4 w-4" strokeWidth={1.75} />
          {showHint ? "Hide hint" : "Show hint"}
        </button>
      )}
      {showHint && !submitted && (
        <p className="mt-3 rounded-xl border border-border/40 bg-card/50 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          {question.hint}
        </p>
      )}

      {/* Feedback */}
      {submitted && (
        <div className="mt-6 rounded-2xl border border-border/40 bg-card/60 p-5">
          <p className="font-display text-xl text-foreground">
            {isCorrect ? question.headlineCorrect : question.headlineIncorrect}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {question.eli5}
          </p>
          {question.whyItMatters && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
              {question.whyItMatters}
            </p>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="mt-8">
        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={selected === null}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-15px_oklch(0.62_0.18_275/0.8)] transition-all disabled:cursor-not-allowed disabled:opacity-40"
          >
            Submit <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-15px_oklch(0.62_0.18_275/0.8)] transition-all"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/practice" })}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Try a full practice exam →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
