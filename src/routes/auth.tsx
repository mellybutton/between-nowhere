import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { ArrowLeft, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/lib/auth-context";
import { enterGuestMode } from "@/lib/guest-mode";
import { StarField } from "@/components/illustrations/StarField";
import { AmbientParticles } from "@/components/illustrations/AmbientParticles";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

type Mode = "signin" | "signup";

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && session) {
      navigate({ to: "/home" });
    }
  }, [session, authLoading, navigate]);

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              typeof window !== "undefined" ? window.location.origin : undefined,
          },
        });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (err) throw err;
      }
      navigate({ to: "/home" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setSubmitting(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri:
          typeof window !== "undefined" ? window.location.origin : undefined,
      });
      if (result.error) {
        throw result.error instanceof Error
          ? result.error
          : new Error(String(result.error));
      }
      if (result.redirected) return;
      navigate({ to: "/home" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign-in failed";
      setError(message);
      setSubmitting(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <StarField density={12} />
      <AmbientParticles count={8} />

      <Link
        to="/"
        className="absolute left-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border/40 bg-background/40 text-foreground backdrop-blur-md transition-colors hover:bg-background/60"
        aria-label="Back"
      >
        <ArrowLeft className="h-4 w-4" />
      </Link>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <div>
          <h1 className="font-narrative text-4xl leading-tight text-foreground">
            {mode === "signup" ? "Save your progress." : "Welcome back."}
          </h1>
          <p className="mt-3 font-interface text-sm text-muted-foreground">
            {mode === "signup"
              ? "So when you come back tomorrow — or next week — you pick up exactly where you left off. No pressure, no spam."
              : "Tune back in. Your signal's right where you left it."}
          </p>
        </div>

        <form onSubmit={handleEmailSubmit} className="mt-8 space-y-3">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="font-interface text-xs uppercase tracking-wider text-muted-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-border/40 bg-input-background px-4 py-3.5 text-foreground outline-none transition-colors focus:border-primary"
              placeholder="you@somewhere.net"
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="font-interface text-xs uppercase tracking-wider text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete={
                mode === "signup" ? "new-password" : "current-password"
              }
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-border/40 bg-input-background px-4 py-3.5 text-foreground outline-none transition-colors focus:border-primary"
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-15px_oklch(0.55_0.18_275/0.8)] transition-opacity disabled:opacity-50"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signup" ? "Save my progress" : "Sign in"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-interface text-xs uppercase tracking-wider text-muted-foreground">
            or
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          disabled={submitting}
          className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border border-border/60 bg-card/40 text-sm font-medium text-foreground transition-colors hover:bg-card disabled:opacity-50"
        >
          <GoogleIcon className="h-5 w-5" />
          Continue with Google
        </button>

        <button
          type="button"
          onClick={async () => {
            await enterGuestMode();
            navigate({ to: "/home" });
          }}
          className="mt-3 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full border border-border/60 bg-transparent text-sm font-medium text-foreground transition-colors hover:bg-card/60"
        >
          Just let me explore →
        </button>

        <button
          type="button"
          onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
          className="mt-8 text-center font-interface text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {mode === "signup"
            ? "Already have an account? Sign in"
            : "New here? Create an account"}
        </button>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 11v3.2h4.5c-.2 1.2-1.4 3.5-4.5 3.5-2.7 0-4.9-2.2-4.9-5s2.2-5 4.9-5c1.5 0 2.6.7 3.2 1.2l2.2-2.1C16 5.5 14.2 4.7 12 4.7 7.9 4.7 4.6 8 4.6 12s3.3 7.3 7.4 7.3c4.3 0 7.1-3 7.1-7.3 0-.5 0-.8-.1-1z"
      />
    </svg>
  );
}
