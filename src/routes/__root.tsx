import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/lib/auth-context";
import appCss from "../styles.css?url";

interface RouterContext {
  queryClient: QueryClient;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-narrative text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-medium text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The signal didn't reach a known frequency.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1",
      },
      { name: "theme-color", content: "#0a0e1f" },
      { title: "Between Nowhere — Learn radio beyond the internet" },
      {
        name: "description",
        content:
          "A cinematic, mobile-first study companion for the US Amateur Radio Technician exam. Built around the 2026–2030 question pool.",
      },
      { name: "author", content: "Between Nowhere" },
      { property: "og:title", content: "Between Nowhere — Learn radio beyond the internet" },
      {
        property: "og:description",
        content: "Learn how communication works beyond the internet.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Between Nowhere — Learn radio beyond the internet" },
      { name: "description", content: "A modern, mobile-first app for learning how communication works beyond the internet and preparing for the Amateur Radio Technician exam. Built to replace outdat" },
      { property: "og:description", content: "A modern, mobile-first app for learning how communication works beyond the internet and preparing for the Amateur Radio Technician exam. Built to replace outdat" },
      { name: "twitter:description", content: "A modern, mobile-first app for learning how communication works beyond the internet and preparing for the Amateur Radio Technician exam. Built to replace outdat" },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/iEztopdIVONztu8n71odRhmQygJ2/social-images/social-1777075633333-ChatGPT_Image_Apr_23,_2026,_02_33_22_AM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/iEztopdIVONztu8n71odRhmQygJ2/social-images/social-1777075633333-ChatGPT_Image_Apr_23,_2026,_02_33_22_AM.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </QueryClientProvider>
  );
}
