import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { StarField } from "@/components/illustrations/StarField";
import { SignalWaves } from "@/components/illustrations/SignalWaves";
import { AmbientParticles } from "@/components/illustrations/AmbientParticles";
import heroBg from "@/assets/hero-night.png";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      throw redirect({ to: "/home" });
    }
  },
  component: IntroPage,
});

function IntroPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-90"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Atmospheric overlay — keep image visible, darken only the bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />

      <SignalWaves />
      <StarField density={20} />
      <AmbientParticles count={15} />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-narrative text-5xl leading-[1.05] text-foreground sm:text-6xl"
          >
            Between
            <br />
            Nowhere
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mx-auto max-w-xs font-interface text-base text-foreground/85"
          >
            This is the world behind walkie-talkies, emergency signals, and ham
            radio.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="font-interface text-sm italic text-muted-foreground"
          >
            Learn how communication works beyond the internet
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 flex flex-col items-center gap-4"
        >
          <Link
            to="/auth"
            className="relative inline-flex h-14 w-56 items-center justify-center overflow-hidden rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.55_0.18_275/0.7)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <span className="relative z-10">Begin</span>
          </Link>

          <p className="font-interface text-xs italic text-muted-foreground/70">
            This will take about 10 minutes
          </p>
        </motion.div>
      </div>
    </div>
  );
}
