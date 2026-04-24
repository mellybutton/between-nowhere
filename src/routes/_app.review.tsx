import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { allQuestions, categoryMap } from "@/lib/questions";

export const Route = createFileRoute("/_app/review")({
  component: ReviewPage,
});

function ReviewPage() {
  const groups = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const q of allQuestions) {
      counts[q.subelement] = (counts[q.subelement] ?? 0) + 1;
    }
    return Object.entries(counts).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  return (
    <section className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-12">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
        The pool
      </p>
      <h1 className="mt-2 font-display text-4xl leading-tight text-foreground">
        Browse by subject
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        All {allQuestions.length} official Technician questions, organized by
        subelement. Tap any group to see what's in it.
      </p>

      <ul className="mt-8 space-y-3">
        {groups.map(([sub, count]) => (
          <li key={sub}>
            <div className="flex items-center justify-between rounded-2xl border border-border/40 bg-card/60 px-5 py-4">
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {sub}
                </p>
                <p className="mt-0.5 text-[15px] text-foreground">
                  {categoryMap[sub] ?? sub}
                </p>
              </div>
              <span className="text-sm tabular-nums text-muted-foreground">
                {count}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to="/learn"
        className="mt-10 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-15px_oklch(0.62_0.18_275/0.8)]"
      >
        Start learning <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
