import { Link, createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero-night.png";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="relative mx-auto flex w-full max-w-md flex-1 flex-col">
      {/* Cinematic background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-8 pt-24 text-center">
        <h1 className="font-display text-6xl leading-[1.05] text-foreground sm:text-7xl">
          Between
          <br />
          Nowhere
        </h1>

        <p className="mt-8 max-w-xs text-[15px] leading-relaxed text-foreground/85">
          This is the world behind walkie-talkies, emergency signals, and ham
          radio.
        </p>

        <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Learn how communication works beyond the internet
        </p>

        <Link
          to="/learn"
          className="mt-12 inline-flex h-14 w-56 items-center justify-center rounded-full bg-primary text-base font-medium text-primary-foreground shadow-[0_10px_40px_-10px_oklch(0.62_0.18_275/0.7)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
        >
          Begin
        </Link>

        <p className="mt-6 text-xs italic text-muted-foreground/80">
          This will take about 10 minutes
        </p>
      </div>
    </section>
  );
}
