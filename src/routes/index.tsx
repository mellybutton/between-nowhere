import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Radio,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

import { StarField } from "@/components/illustrations/StarField";
import { SignalWaves } from "@/components/illustrations/SignalWaves";
import { AmbientParticles } from "@/components/illustrations/AmbientParticles";
import heroBg from "@/assets/hero-night.webp";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    // Only load Supabase if there's a chance of an active session.
    // This keeps the auth SDK out of the critical bundle for first-time visitors.
    if (typeof window === "undefined") return;
    const hasAuthToken = Object.keys(window.localStorage).some((k) =>
      k.startsWith("sb-") && k.endsWith("-auth-token"),
    );
    if (!hasAuthToken) return;
    const { supabase } = await import("@/integrations/supabase/client");
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      throw redirect({ to: "/home" });
    }
  },
  component: IntroPage,
  head: () => ({
    meta: [
      { title: "Between Nowhere — Pass the Amateur Radio Technician Exam" },
      {
        name: "description",
        content:
          "A cinematic, beginner-friendly study companion for the FCC Amateur Radio Technician exam. Full 2026–2030 question pool, progress tracking, and the why behind every signal.",
      },
    ],
    links: [
      // Preload the hero background so FCP/LCP paint as soon as possible
      { rel: "preload", as: "image", href: heroBg, type: "image/webp", fetchpriority: "high" },
      // Preload the Fraunces weight used by the H1 (LCP element) so text paints without waiting on CSS chain
      {
        rel: "preload",
        as: "font",
        href: "https://fonts.gstatic.com/s/fraunces/v38/6NU78FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0KxC9TeP2Xz5c.woff2",
        type: "font/woff2",
        crossOrigin: "anonymous",
        fetchpriority: "high",
      },
    ],
  }),
});

function IntroPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      {/* Hero — viewport height */}
      <section className="relative flex min-h-screen flex-col overflow-hidden">
        {/* Background image — anchored bottom so the foreground stays in view */}
        <div
          className="absolute inset-0 bg-cover bg-bottom bg-no-repeat opacity-95"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/85" />
        <div className="absolute inset-0 bg-background/60" />

        <SignalWaves />
        <StarField density={20} />
        <AmbientParticles count={15} />

        {/* Top brand bar */}
        <div className="relative z-20 mx-auto flex w-full max-w-md items-center justify-between px-6 pt-6">
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-primary-accent" strokeWidth={1.75} />
            <span className="font-interface text-[13px] tracking-wide text-foreground/85">
              Between Nowhere
            </span>
          </div>
          <Link
            to="/auth"
            className="font-interface text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
        </div>

        <div className="relative z-10 mx-auto flex flex-1 w-full max-w-md flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="space-y-5"
          >
            {/* Eyebrow — concrete value prop */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary-accent/30 bg-primary/10 px-3.5 py-1.5 backdrop-blur-md"
            >
              <Sparkles
                className="h-3 w-3 text-primary-accent"
                strokeWidth={2}
              />
              <span className="font-interface text-[11px] uppercase tracking-[0.18em] text-primary-accent">
                FCC Technician · 2026–2030 pool
              </span>
            </motion.div>

            <h1
              className="font-narrative text-[44px] leading-[1.05] text-foreground sm:text-6xl"
            >
              Pass your
              <br />
              <span className="text-primary-accent">ham radio</span> exam.
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="mx-auto max-w-sm font-interface text-base leading-relaxed text-foreground/85"
            >
              A beginner-friendly study companion for the Amateur Radio
              Technician exam — and a quiet introduction to how communication
              works beyond the internet.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="mt-10 flex w-full flex-col items-center gap-3"
          >
            <Link
              to="/auth"
              className="relative inline-flex h-14 w-full max-w-[280px] items-center justify-center gap-2 overflow-hidden rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.55_0.18_275/0.7)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <span className="relative z-10">Start studying — free</span>
              <ArrowRight className="relative z-10 h-4 w-4" />
            </Link>

            <p className="font-interface text-[12px] text-muted-foreground/80">
              No credit card · ~10 minutes to your first concept
            </p>
          </motion.div>

          {/* Trust micro-row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-interface text-[11px] uppercase tracking-[0.16em] text-muted-foreground/85"
          >
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-success" strokeWidth={2.25} />
              All 411 questions
            </span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-success" strokeWidth={2.25} />
              Progress saved
            </span>
            <span className="hidden h-3 w-px bg-border sm:inline-block" />
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3 w-3 text-success" strokeWidth={2.25} />
              Built for beginners
            </span>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="relative z-10 pb-6 text-center"
        >
          <p className="font-interface text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
            How it works ↓
          </p>
        </motion.div>
      </section>

      {/* Section: What you get */}
      <section className="relative z-10 mx-auto w-full max-w-md px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <p className="font-interface text-[11px] uppercase tracking-[0.18em] text-primary-accent">
            What you get
          </p>
          <h2 className="mt-3 font-narrative text-[32px] leading-[1.15] text-foreground">
            Everything you need to pass — nothing you don't.
          </h2>
        </motion.div>

        <ul className="space-y-3">
          <FeatureRow
            icon={<ShieldCheck className="h-4 w-4" strokeWidth={1.75} />}
            title="Full FCC question pool, 2026–2030"
            body="All 411 official questions — exactly what appears on exam day."
            delay={0}
          />
          <FeatureRow
            icon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />}
            title="Beginner-friendly, plain-English explanations"
            body="No jargon walls. Every concept opens with a hook, an insight, then a question."
            delay={0.05}
          />
          <FeatureRow
            icon={<TrendingUp className="h-4 w-4" strokeWidth={1.75} />}
            title="Progress that follows you"
            body="See your signal strength grow. Pick up exactly where you left off, on any device."
            delay={0.1}
          />
          <FeatureRow
            icon={<Radio className="h-4 w-4" strokeWidth={1.75} />}
            title="Communication beyond the internet"
            body="A quiet education in walkie-talkies, repeaters, antennas, and emergency comms."
            delay={0.15}
          />
        </ul>
      </section>

      {/* Section: Social proof / context */}
      <section className="relative z-10 border-t border-border/40 bg-card/20 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-md px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-3 gap-4 text-center"
          >
            <Stat value="411" label="questions" />
            <Stat value="35" label="exam length" />
            <Stat value="74%" label="to pass" />
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-10 border-l-2 border-primary-accent/50 pl-5"
          >
            <p className="font-narrative text-[20px] leading-[1.4] italic text-foreground/90">
              "I came to pass the test. I left understanding why my walkie-talkie
              works."
            </p>
            <footer className="mt-3 font-interface text-[12px] uppercase tracking-[0.16em] text-muted-foreground">
              — The point of this app
            </footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 mx-auto w-full max-w-md px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="font-narrative text-[28px] leading-[1.2] text-foreground">
            Your call sign is waiting.
          </h3>
          <p className="mt-3 font-interface text-sm text-muted-foreground">
            Free to start. Your progress saves automatically.
          </p>
          <Link
            to="/auth"
            className="mt-7 inline-flex h-14 w-full max-w-[280px] items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.55_0.18_275/0.7)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Begin <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-10 font-interface text-[11px] uppercase tracking-[0.2em] text-muted-foreground/60">
            Between Nowhere · Made for the curious
          </p>
        </motion.div>
      </section>
    </div>
  );
}

function FeatureRow({
  icon,
  title,
  body,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      className="flex gap-4 rounded-2xl border border-border/40 bg-card/40 p-5 backdrop-blur-sm"
    >
      <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-primary-accent/30 bg-primary/10 text-primary-accent">
        {icon}
      </div>
      <div>
        <p className="font-interface text-[15px] font-medium text-foreground">
          {title}
        </p>
        <p className="mt-1 font-interface text-[13px] leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
    </motion.li>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-narrative text-[28px] leading-none text-primary-accent font-mono-numeric">
        {value}
      </p>
      <p className="mt-2 font-interface text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
