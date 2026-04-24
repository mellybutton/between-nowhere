import { Link, Outlet, createFileRoute, useLocation } from "@tanstack/react-router";
import { Home, Radio, Target, BookOpen } from "lucide-react";

export const Route = createFileRoute("/_app")({
  component: AppShell,
});

const tabs = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/learn", label: "Learn", icon: Radio, exact: false },
  { to: "/practice", label: "Practice", icon: Target, exact: false },
  { to: "/review", label: "Review", icon: BookOpen, exact: false },
] as const;

function AppShell() {
  const { pathname } = useLocation();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background text-foreground">
      <main className="flex flex-1 flex-col pb-24">
        <Outlet />
      </main>

      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/85 backdrop-blur-xl"
      >
        <ul className="mx-auto flex max-w-md items-stretch justify-around px-4 pb-[env(safe-area-inset-bottom)] pt-2">
          {tabs.map(({ to, label, icon: Icon, exact }) => {
            const active = exact ? pathname === to : pathname.startsWith(to);
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  className="flex flex-col items-center justify-center gap-1 px-2 py-2 text-[11px] font-medium tracking-wide transition-colors"
                >
                  <span
                    className={`flex h-9 w-12 items-center justify-center rounded-xl transition-colors ${
                      active
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span
                    className={
                      active ? "text-accent-foreground" : "text-muted-foreground"
                    }
                  >
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
