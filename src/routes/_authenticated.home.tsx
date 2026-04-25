import { useState } from "react";
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Loader2, X, Bookmark } from "lucide-react";
import { useConceptProgress, deriveProgressStats } from "@/lib/progress";
import { useMomentum } from "@/lib/momentum";
import { returningCopy, emptyStates, streakBadge } from "@/lib/feedback-voice";
import { isGuest } from "@/lib/guest-mode";
import {
  useGuestReturned,
  dismissGuestReturnPrompt,
} from "@/lib/guest-return";
import { StarField } from "@/components/illustrations/StarField";
import { AmbientParticles } from "@/components/illustrations/AmbientParticles";
import heroBg from "@/assets/hero-night.webp";

export const Route = createFileRoute("/_authenticated/home")({
  component: HomePage,
});

function HomePage() {
  const guest = isGuest();
  const guestReturned = useGuestReturned(guest);
  const [returnDismissed, setReturnDismissed] = useState(false);
  const showReturnPrompt = guest && guestReturned && !returnDismissed;
  const { data: rows } = useConceptProgress();
  const realStats = deriveProgressStats(rows);
  const realMomentum = useMomentum();
  // In guest mode, show a clean zero-state — never surface another user's
  // cached data, never imply progress is being saved.
  const stats = guest
    ? { ...realStats, completed: 0, remaining: realStats.total, percent: 0 }
    : realStats;
  const momentum = guest
    ? { ...realMomentum, streak: 0, daysSinceLast: 0, lastAttempt: null }
    : realMomentum;
  const minutes = Math.max(1, Math.round(stats.remaining * 0.25));
  const isFresh = stats.completed === 0;
  const isComplete = stats.completed > 0 && stats.remaining === 0;
  const returning = guest
    ? null
    : returningCopy({
        daysSinceLast: momentum.daysSinceLast,
        completed: stats.completed,
      });
  const streakLabel = guest ? null : streakBadge(momentum.streak);

  // Track in-flight navigation so cards can show a loading state
  const pendingHref = useRouterState({
    select: (s) => {
      if (!s.isLoading && !s.isTransitioning) return null;
      return s.matches[s.matches.length - 1]?.pathname ?? null;
    },
  });

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
            {isComplete
              ? emptyStates.allConceptsDone.headline
              : isFresh
                ? emptyStates.homeFresh.headline
                : "Learning radio, one signal at a time"}
          </p>
        </motion.div>

        {/* Returning + streak surface */}
        {(returning || streakLabel) && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 flex items-start gap-3 rounded-2xl border border-border/40 bg-card/30 px-4 py-3 backdrop-blur-sm"
          >
            {streakLabel && (
              <span className="flex shrink-0 items-center gap-1 rounded-full border border-primary-accent/30 bg-primary/10 px-2.5 py-1 font-interface text-[11px] text-primary-accent">
                <Flame className="h-3 w-3" strokeWidth={2} />
                {streakLabel}
              </span>
            )}
            {returning && (
              <div className="min-w-0">
                <p className="font-interface text-[13px] font-medium text-foreground">
                  {returning.headline}
                </p>
                {returning.body && (
                  <p className="mt-0.5 font-interface text-[12px] leading-relaxed text-muted-foreground">
                    {returning.body}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}

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
            disabled={pendingHref === "/learn"}
            className="group block w-full overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 to-primary/5 p-5 text-left transition-opacity disabled:pointer-events-none disabled:opacity-70"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-interface font-medium text-foreground">
                  {pendingHref === "/learn"
                    ? "Tuning in…"
                    : stats.completed === 0
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
              {pendingHref === "/learn" ? (
                <Loader2
                  size={18}
                  strokeWidth={1.75}
                  className="animate-spin text-primary-accent"
                />
              ) : (
                <ArrowRight
                  size={18}
                  strokeWidth={1.75}
                  className="text-primary-accent transition-transform group-hover:translate-x-1"
                />
              )}
            </div>
          </Link>

          <Link
            to="/practice"
            disabled={pendingHref === "/practice"}
            className="block w-full rounded-2xl border border-border bg-card/50 p-5 text-left transition-colors hover:border-primary-accent/30 disabled:pointer-events-none disabled:opacity-70"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-interface font-medium text-foreground">
                  {pendingHref === "/practice" ? "Tuning in…" : "Practice"}
                </div>
                <div className="mt-1 font-interface text-xs text-muted-foreground">
                  35-question realistic exam
                </div>
              </div>
              {pendingHref === "/practice" ? (
                <Loader2
                  size={18}
                  strokeWidth={1.75}
                  className="animate-spin text-primary-accent"
                />
              ) : (
                <span className="text-xl">🎯</span>
              )}
            </div>
          </Link>

          <Link
            to="/review"
            disabled={pendingHref === "/review"}
            className="block w-full rounded-2xl border border-border bg-card/50 p-5 text-left transition-colors hover:border-primary-accent/30 disabled:pointer-events-none disabled:opacity-70"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-interface font-medium text-foreground">
                  {pendingHref === "/review" ? "Tuning in…" : "Review"}
                </div>
                <div className="mt-1 font-interface text-xs text-muted-foreground">
                  Browse all 409 questions
                </div>
              </div>
              {pendingHref === "/review" ? (
                <Loader2
                  size={18}
                  strokeWidth={1.75}
                  className="animate-spin text-primary-accent"
                />
              ) : (
                <span className="text-xl">📖</span>
              )}
            </div>
          </Link>
        </motion.div>

        {guest && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-full border border-border/40 bg-card/30 px-4 py-2 backdrop-blur-sm"
          >
            <span className="font-interface text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Guest mode · progress isn't saved
            </span>
            <Link
              to="/auth"
              className="font-interface text-[11px] uppercase tracking-[0.16em] text-primary-accent transition-opacity hover:opacity-80"
            >
              Save progress →
            </Link>
          </motion.div>
        )}

        <p className="mt-10 text-center font-interface text-xs italic text-muted-foreground/60">
          {stats.remaining > 0
            ? `About ${minutes} minutes to complete all concepts`
            : "You've reached every signal."}
        </p>
      </div>
    </div>
  );
}
