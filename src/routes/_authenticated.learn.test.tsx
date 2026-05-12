/**
 * Integration test for the Learn flow state machine.
 *
 * The flow now collapses success+transition into a single screen: clicking
 * Continue on the reveal screen records the concept and advances directly to
 * the next concept's hook. Tests assert that:
 *
 *   1. Clicking Continue on reveal advances to the next concept (or the "all
 *      complete" screen) — never re-renders the same concept's reveal.
 *   2. The success/reveal screen renders exactly once per concept completion.
 *   3. A stale progress refetch arriving after dismissal cannot resurrect the
 *      dismissed reveal.
 *
 * Strategy: mock `@/lib/progress` so we control when `mutateAsync` resolves
 * and when `rows` updates. This mirrors the real Supabase + React Query timing
 * where `mutateAsync` returns before the cache refetch completes — which was
 * the root cause of the original loop.
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { learnFlowConcepts, stageBreakpoints } from "@/data/learnFlow";
import type { ConceptProgressRow } from "@/lib/progress";

// ---- Mocks ---------------------------------------------------------------

vi.mock("@/lib/auth-context", () => ({
  useAuth: () => ({
    user: { id: "test-user" },
    session: { user: { id: "test-user" } },
    loading: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: () => ({
      select: () => ({
        order: () => Promise.resolve({ data: [], error: null }),
        eq: () => ({
          maybeSingle: () => Promise.resolve({ data: null, error: null }),
        }),
      }),
      insert: () => Promise.resolve({ error: null }),
      update: () => ({ eq: () => Promise.resolve({ error: null }) }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null } }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
  },
}));

vi.mock("@/components/illustrations/StarField", () => ({
  StarField: () => null,
}));
vi.mock("@/components/illustrations/AmbientParticles", () => ({
  AmbientParticles: () => null,
}));
vi.mock("@/components/illustrations/ConceptIllustrations", () => ({
  ConceptIllustration: () => null,
  hasIllustration: () => false,
}));

type ProgressState = {
  rows: ConceptProgressRow[];
  resolveNextMutation: (() => void) | null;
  persistMutationRows: boolean;
  mutationCalls: number;
};
const progressState: ProgressState = {
  rows: [],
  resolveNextMutation: null,
  persistMutationRows: true,
  mutationCalls: 0,
};
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

vi.mock("@/lib/progress", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/progress")>("@/lib/progress");
  const { useState, useEffect } = await import("react");
  return {
    ...actual,
    useConceptProgress: () => {
      const [, force] = useState(0);
      useEffect(() => {
        const cb = () => force((n) => n + 1);
        listeners.add(cb);
        return () => {
          listeners.delete(cb);
        };
      }, []);
      return { data: progressState.rows };
    },
    useRecordConcept: () => ({
      isPending: false,
      mutateAsync: async (input: {
        conceptId: string;
        wasCorrectFirstTry: boolean;
      }) => {
        progressState.mutationCalls += 1;
        if (progressState.persistMutationRows) {
          progressState.rows = [
            ...progressState.rows,
            makeRow(input.conceptId, input.wasCorrectFirstTry),
          ];
          notify();
        }
        await Promise.resolve();
      },
    }),
  };
});

function makeRow(
  conceptId: string,
  firstTry: boolean,
): ConceptProgressRow {
  return {
    id: `row-${conceptId}`,
    user_id: "test-user",
    concept_id: conceptId,
    status: "completed",
    was_correct_first_try: firstTry,
    attempts: 1,
    completed_at: new Date().toISOString(),
  };
}

// ---- Test harness --------------------------------------------------------

async function renderLearnPage() {
  const { Route: LearnRoute } = await import(
    "@/routes/_authenticated.learn"
  );
  const LearnComponent = LearnRoute.options.component!;

  const rootRoute = createRootRoute({ component: () => <Outlet /> });
  const learnRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/learn",
    component: LearnComponent as never,
  });
  const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/home",
    component: () => <div data-testid="home-route">home</div>,
  });
  const practiceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/practice",
    component: () => <div data-testid="practice-route">practice</div>,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([learnRoute, homeRoute, practiceRoute]),
    history: createMemoryHistory({ initialEntries: ["/learn"] }),
  });

  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );

  await screen.findByRole("button", { name: /continue/i });
  return { router };
}

/**
 * Drive the LearnPage from the hook of one concept all the way through reveal
 * Continue. After this returns, the page is on the *next* concept's hook (or
 * the "all complete" screen if this was the last concept).
 */
async function completeOneConcept(conceptIndex: number) {
  const user = userEvent.setup();
  const concept = learnFlowConcepts[conceptIndex];

  await user.click(await screen.findByRole("button", { name: /continue/i }));
  await user.click(await screen.findByRole("button", { name: /^next$/i }));

  const correctText = concept.answers[concept.correctIndex];
  await user.click(await screen.findByText(correctText));
  await user.click(await screen.findByRole("button", { name: /submit/i }));

  const revealContinue = await screen.findByTestId("learn-reveal-continue");
  // Reveal screen renders exactly once.
  expect(screen.getAllByTestId("learn-reveal-continue")).toHaveLength(1);

  await act(async () => {
    await user.click(revealContinue);
  });
}

async function completeOneConceptAfterWrongAnswer(conceptIndex: number) {
  const user = userEvent.setup();
  const concept = learnFlowConcepts[conceptIndex];

  await user.click(await screen.findByRole("button", { name: /continue/i }));
  await user.click(await screen.findByRole("button", { name: /^next$/i }));

  const wrongText = concept.answers.find(
    (_answer, index) => index !== concept.correctIndex,
  )!;
  await user.click(await screen.findByText(wrongText));
  await user.click(await screen.findByRole("button", { name: /submit/i }));

  const correctText = concept.answers[concept.correctIndex];
  await user.click(await screen.findByText(correctText));
  await user.click(await screen.findByRole("button", { name: /submit/i }));

  const revealContinue = await screen.findByTestId("learn-reveal-continue");
  expect(screen.getAllByTestId("learn-reveal-continue")).toHaveLength(1);

  await act(async () => {
    await user.click(revealContinue);
  });
}

// ---- Tests ---------------------------------------------------------------

beforeEach(() => {
  progressState.rows = [];
  progressState.resolveNextMutation = null;
  progressState.persistMutationRows = true;
  progressState.mutationCalls = 0;
  listeners.clear();
});

describe("Learn flow — single success screen, no loop", () => {
  it("mid-stage concept advances directly to the next concept's hook", async () => {
    await renderLearnPage();

    await completeOneConcept(0);

    expect(
      await screen.findByText(learnFlowConcepts[1].hook),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].correctAnswerText),
    ).not.toBeInTheDocument();
    // No second "transition" success screen exists anymore.
    expect(
      screen.queryByRole("button", { name: /next concept/i }),
    ).not.toBeInTheDocument();
  });

  it("last concept of a stage advances to the next stage's first concept", async () => {
    const lastIntuitionIdx = stageBreakpoints.intuition - 1;
    progressState.rows = learnFlowConcepts
      .slice(0, lastIntuitionIdx)
      .map((c) => makeRow(c.id, true));

    await renderLearnPage();

    expect(
      await screen.findByText(learnFlowConcepts[lastIntuitionIdx].hook),
    ).toBeInTheDocument();

    await completeOneConcept(lastIntuitionIdx);

    const nextConcept = learnFlowConcepts[lastIntuitionIdx + 1];
    expect(await screen.findByText(nextConcept.hook)).toBeInTheDocument();
  });

  it("last concept of the whole flow shows the completion screen exactly once", async () => {
    const lastIdx = learnFlowConcepts.length - 1;
    progressState.rows = learnFlowConcepts
      .slice(0, lastIdx)
      .map((c) => makeRow(c.id, true));

    await renderLearnPage();

    expect(
      await screen.findByText(learnFlowConcepts[lastIdx].hook),
    ).toBeInTheDocument();

    await completeOneConcept(lastIdx);

    expect(await screen.findByText(/every signal received/i)).toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[lastIdx].correctAnswerText),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /^continue$/i }),
    ).not.toBeInTheDocument();
  });

  it("regression: reveal does not re-render after dismissal", async () => {
    await renderLearnPage();
    await completeOneConcept(0);

    expect(await screen.findByText(learnFlowConcepts[1].hook)).toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].correctAnswerText),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("learn-reveal-continue"),
    ).not.toBeInTheDocument();
  });

  it("regression: wrong answer then right answer advances only one concept", async () => {
    await renderLearnPage();
    await completeOneConceptAfterWrongAnswer(0);

    expect(progressState.rows).toHaveLength(1);
    expect(progressState.rows[0].concept_id).toBe(learnFlowConcepts[0].id);
    expect(progressState.rows[0].was_correct_first_try).toBe(false);

    expect(await screen.findByText(learnFlowConcepts[1].hook)).toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].correctAnswerText),
    ).not.toBeInTheDocument();
  });

  it.each([
    { label: "one wrong attempt", wrongAttempts: 1 },
    { label: "two wrong attempts", wrongAttempts: 2 },
  ])(
    "regression matrix: $label still leaves reveal once",
    async ({ wrongAttempts }) => {
      await renderLearnPage();
      const user = userEvent.setup();
      const concept = learnFlowConcepts[0];

      await user.click(await screen.findByRole("button", { name: /continue/i }));
      await user.click(await screen.findByRole("button", { name: /^next$/i }));

      const wrongAnswers = concept.answers.filter(
        (_answer, index) => index !== concept.correctIndex,
      );
      for (let i = 0; i < wrongAttempts; i += 1) {
        await user.click(await screen.findByText(wrongAnswers[i]));
        await user.click(await screen.findByRole("button", { name: /submit/i }));
      }

      await user.click(await screen.findByText(concept.answers[concept.correctIndex]));
      await user.click(await screen.findByRole("button", { name: /submit/i }));
      const revealContinue = await screen.findByTestId("learn-reveal-continue");

      await act(async () => {
        await user.click(revealContinue);
      });

      expect(progressState.mutationCalls).toBe(1);
      expect(await screen.findByText(learnFlowConcepts[1].hook)).toBeInTheDocument();
    },
  );

  it("regression: double-tapping reveal continue records once and does not loop", async () => {
    await renderLearnPage();
    const user = userEvent.setup();
    const concept = learnFlowConcepts[0];

    await user.click(await screen.findByRole("button", { name: /continue/i }));
    await user.click(await screen.findByRole("button", { name: /^next$/i }));
    await user.click(await screen.findByText(concept.answers[concept.correctIndex]));
    await user.click(await screen.findByRole("button", { name: /submit/i }));

    const revealContinue = await screen.findByTestId("learn-reveal-continue");
    await act(async () => {
      await Promise.all([user.click(revealContinue), user.click(revealContinue)]);
    });

    expect(progressState.mutationCalls).toBe(1);
    expect(await screen.findByText(learnFlowConcepts[1].hook)).toBeInTheDocument();
  });

  it("regression: stale progress refetch cannot resurrect dismissed reveal", async () => {
    progressState.persistMutationRows = false;
    await renderLearnPage();

    await completeOneConceptAfterWrongAnswer(0);
    expect(progressState.rows).toHaveLength(0);
    expect(progressState.mutationCalls).toBe(1);

    expect(await screen.findByText(learnFlowConcepts[1].hook)).toBeInTheDocument();

    act(() => {
      notify();
    });

    expect(await screen.findByText(learnFlowConcepts[1].hook)).toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].correctAnswerText),
    ).not.toBeInTheDocument();
  });
});
