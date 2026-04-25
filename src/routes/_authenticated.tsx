import { Outlet, createFileRoute, redirect, useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Home as HomeIcon, Radio, Target, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { isGuest } from "@/lib/guest-mode";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    // Allow guest mode (no account, no persistence) to bypass the auth gate.
    if (isGuest()) return;
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({ to: "/auth" });
    }
  },
  component: AuthenticatedLayout,
});

const tabs = [
  { to: "/home", label: "Home", icon: HomeIcon },
  { to: "/learn", label: "Learn", icon: Radio },
  { to: "/practice", label: "Practice", icon: Target },
  { to: "/review", label: "Review", icon: BookOpen },
] as const;

function AuthenticatedLayout() {
  const { loading } = useAuth();
  const { pathname } = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

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
          {tabs.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(`${to}/`);
            return (
              <li key={to} className="flex-1">
                <Link
                  to={to}
                  className="flex flex-col items-center justify-center gap-1 px-2 py-2 font-interface text-[11px] tracking-wide transition-colors"
                >
                  <span
                    className={`flex h-9 w-12 items-center justify-center rounded-xl transition-colors ${
                      active
                        ? "bg-primary/15 text-primary-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span
                    className={
                      active
                        ? "font-medium text-primary-accent"
                        : "text-muted-foreground"
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
