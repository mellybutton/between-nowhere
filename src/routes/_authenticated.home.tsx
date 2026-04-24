import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useConceptProgress, deriveProgressStats } from "@/lib/progress";
import { StarField } from "@/components/illustrations/StarField";
import { AmbientParticles } from "@/components/illustrations/AmbientParticles";
import heroBg from "@/assets/hero-night.png";

export const Route = createFileRoute("/_authenticated/home")({
  component: HomePage,
});

function HomePage() {
  const { data: rows } = useConceptProgress();
  const stats = deriveProgressStats(rows);
  const minutes = Math.max(1, Math.round(stats.remaining * 0.25));

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background" />
      <StarField density={15} />
      <AmbientParticles count={10} />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col px-6 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-narrative text-[28px] leading-tight text-foreground">
            Between Nowhere
          </h1>
          <p className="mt-1 font-interface text-sm italic text-muted-foreground">
            Learning radio, one signal at a time
          </p>
        </motion.div>

        {/* Signal strength card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-8 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/5 p-6"
        >
          <div className="flex items-baseline justify-between">
            <span className="font-interface text-xs italic text-primary-accent">
              Signal strength
            </span>
            <span className="font-interface text-2xl font-medium font-mono-numeric text-foreground">
              {stats.percent}%
            </span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-background/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stats.percent}%` }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-accent"
            />
          </div>
          <p className="mt-4 font-interface text-sm text-foreground/70">
            {stats.completed} of {stats.total} concepts learned
          </p>
        </motion.div>

        {/* Action cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 space-y-3"
        >
          <Link
            to="/learn"
            className="group block w-full overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 p-5 text-left"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-interface font-medium text-foreground">
                  {stats.completed === 0
                    ? "Start learning"
                    : stats.remaining === 0
                      ? "Review what you know"
                      : "Continue learning"}
                </div>
                <div className="mt-1 font-interface text-xs text-muted-foreground">
                  {stats.remaining === 0
                    ? "All concepts complete"
                    : `${stats.remaining} concepts remaining`}
                </div>
              </div>
              <ArrowRight
                size={18}
                strokeWidth={1.75}
                className="text-primary-accent transition-transform group-hover:translate-x-1"
              />
            </div>
          </Link>

          <Link
            to="/practice"
            className="block w-full rounded-2xl border border-border bg-card/50 p-5 text-left transition-colors hover:border-primary-accent/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-interface font-medium text-foreground">
                  Practice
                </div>
                <div className="mt-1 font-interface text-xs text-muted-foreground">
                  35-question realistic exam
                </div>
              </div>
              <span className="text-xl">🎯</span>
            </div>
          </Link>

          <Link
            to="/review"
            className="block w-full rounded-2xl border border-border bg-card/50 p-5 text-left transition-colors hover:border-primary-accent/30"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-interface font-medium text-foreground">
                  Review
                </div>
                <div className="mt-1 font-interface text-xs text-muted-foreground">
                  Browse all 409 questions
                </div>
              </div>
              <span className="text-xl">📖</span>
            </div>
          </Link>
        </motion.div>

        <p className="mt-10 text-center font-interface text-xs italic text-muted-foreground/60">
          {stats.remaining > 0
            ? `About ${minutes} minutes to complete all concepts`
            : "You've reached every signal."}
        </p>
      </div>
    </div>
  );
}
