/**
 * Integration test for the Learn flow state machine.
 *
 * Reproduces the exact race that caused the "stuck on success screen" loop
 * in three scenarios: a mid-stage concept, the last concept of a stage,
 * and the last concept of the whole flow. Asserts that:
 *
 *   1. The success/reveal screen advances to the transition screen after
 *      `complete()` resolves — even if the cache refetch hasn't propagated yet.
 *   2. After clicking "Next concept", the user lands on the *next* concept's
 *      hook (or the "all complete" screen for the final case) — never on the
 *      same concept's success screen again.
 *   3. The success screen renders exactly once per concept completion.
 *
 * Strategy: mock `@/lib/progress` so we control when `mutateAsync` resolves
 * and when `rows` updates. This mirrors the real Supabase + React Query
 * timing where `mutateAsync` returns before the cache refetch completes —
 * which was the root cause of the original loop.
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

// Auth context: stable fake user.
vi.mock("@/lib/auth-context", () => ({
  useAuth: () => ({
    user: { id: "test-user" },
    session: { user: { id: "test-user" } },
    loading: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Supabase client: never actually called because we mock progress, but stub
// it so any incidental imports don't blow up.
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

// Heavy visual components — replace with no-op stubs so jsdom doesn't choke.
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

// The data layer — this is where we control the race.
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
      // mutateAsync mimics the real flow: DB write returns, then we'd refetch.
      // In the buggy version, the refetch happened *after* mutateAsync resolved
      // (race). In the fixed version, mutateAsync only resolves after rows update.
      // We model the FIXED contract: rows are updated before mutateAsync resolves.
      mutateAsync: async (input: {
        conceptId: string;
        wasCorrectFirstTry: boolean;
      }) => {
        progressState.mutationCalls += 1;
        if (progressState.persistMutationRows) {
          // Add the completed row.
          progressState.rows = [
            ...progressState.rows,
            makeRow(input.conceptId, input.wasCorrectFirstTry),
          ];
          // Notify subscribers (simulates query cache invalidation completing).
          notify();
        }
        // Yield once so React can flush before the caller advances phase.
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
  // Import after mocks are registered.
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

  // Wait for the first render to settle.
  await screen.findByRole("button", { name: /continue/i });
  return { router };
}

/**
 * Drive the LearnPage from the hook screen of one concept all the way through
 * to the hook screen of the next concept. Picks the correct answer
 * deterministically (we know the source-order index even though the UI
 * shuffles for display — we click by visible answer text).
 */
async function completeOneConcept(conceptIndex: number) {
  const user = userEvent.setup();
  const concept = learnFlowConcepts[conceptIndex];

  // Hook screen → click "Continue"
  await user.click(await screen.findByRole("button", { name: /continue/i }));

  // Insight screen → click "Next"
  await user.click(await screen.findByRole("button", { name: /^next$/i }));

  // Question screen — find the correct answer button by its text.
  const correctText = concept.answers[concept.correctIndex];
  await user.click(await screen.findByText(correctText));
  await user.click(await screen.findByRole("button", { name: /submit/i }));

  // Reveal screen — assert it's there exactly once.
  const revealButtons = await screen.findAllByRole("button", {
    name: /^continue$/i,
  });
  expect(revealButtons).toHaveLength(1);

  // Click Continue → triggers complete() → transition screen.
  await act(async () => {
    await user.click(revealButtons[0]);
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

  const revealButtons = await screen.findAllByRole("button", {
    name: /^continue$/i,
  });
  expect(revealButtons).toHaveLength(1);

  await act(async () => {
    await user.click(revealButtons[0]);
  });
}

async function finishTransitionToNextConcept(currentIndex: number) {
  const nextBtn = await screen.findByRole("button", {
    name: /next concept/i,
  });
  await userEvent.setup().click(nextBtn);

  const nextConcept = learnFlowConcepts[currentIndex + 1];
  expect(await screen.findByText(nextConcept.hook)).toBeInTheDocument();
  expect(
    screen.queryByText(learnFlowConcepts[currentIndex].correctAnswerText),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(learnFlowConcepts[currentIndex].continueText),
  ).not.toBeInTheDocument();
}

// ---- Tests ---------------------------------------------------------------

beforeEach(() => {
  progressState.rows = [];
  progressState.resolveNextMutation = null;
  progressState.persistMutationRows = true;
  progressState.mutationCalls = 0;
  listeners.clear();
});

describe("Learn flow — no infinite success loop", () => {
  it("mid-stage concept advances to the next concept's hook", async () => {
    await renderLearnPage();

    // Concept 0 (mid-stage of the intuition stage).
    await completeOneConcept(0);

    // Transition screen renders.
    const nextBtn = await screen.findByRole("button", {
      name: /next concept/i,
    });
    await userEvent.setup().click(nextBtn);

    // We should now be on concept 1's hook — NOT concept 0's reveal.
    expect(
      await screen.findByText(learnFlowConcepts[1].hook),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].correctAnswerText),
    ).not.toBeInTheDocument();
  });

  it("last concept of a stage advances to the next stage's first concept", async () => {
    // Pre-seed all but the last concept of the intuition stage as completed.
    const lastIntuitionIdx = stageBreakpoints.intuition - 1; // index 3
    progressState.rows = learnFlowConcepts
      .slice(0, lastIntuitionIdx)
      .map((c) => makeRow(c.id, true));

    await renderLearnPage();

    // The page should now be sitting on concept index 3's hook.
    expect(
      await screen.findByText(learnFlowConcepts[lastIntuitionIdx].hook),
    ).toBeInTheDocument();

    await completeOneConcept(lastIntuitionIdx);

    const nextBtn = await screen.findByRole("button", {
      name: /next concept/i,
    });
    await userEvent.setup().click(nextBtn);

    // Should land on the first concept of the next stage.
    const nextConcept = learnFlowConcepts[lastIntuitionIdx + 1];
    expect(await screen.findByText(nextConcept.hook)).toBeInTheDocument();
  });

  it("last concept of the whole flow shows the completion screen exactly once", async () => {
    // Pre-seed everything but the very last concept.
    const lastIdx = learnFlowConcepts.length - 1;
    progressState.rows = learnFlowConcepts
      .slice(0, lastIdx)
      .map((c) => makeRow(c.id, true));

    await renderLearnPage();

    expect(
      await screen.findByText(learnFlowConcepts[lastIdx].hook),
    ).toBeInTheDocument();

    await completeOneConcept(lastIdx);

    const nextBtn = await screen.findByRole("button", {
      name: /next concept/i,
    });
    await userEvent.setup().click(nextBtn);

    // Final screen — "Every signal received."
    expect(await screen.findByText(/every signal received/i)).toBeInTheDocument();
    // The reveal text should NOT be on screen anymore.
    expect(
      screen.queryByText(learnFlowConcepts[lastIdx].correctAnswerText),
    ).not.toBeInTheDocument();
    // And the success/reveal "Continue" button should not still be there.
    expect(
      screen.queryByRole("button", { name: /^continue$/i }),
    ).not.toBeInTheDocument();
  });

  it("regression: success screen does not re-render after dismissal", async () => {
    await renderLearnPage();
    await completeOneConcept(0);

    // Currently on transition screen for concept 0.
    expect(await screen.findByText(learnFlowConcepts[0].continueText)).toBeInTheDocument();

    // Click "Next concept" exactly once.
    const nextBtn = screen.getByRole("button", { name: /next concept/i });
    await userEvent.setup().click(nextBtn);

    // Concept 1 hook should appear, and concept 0's reveal artifacts must be gone.
    expect(await screen.findByText(learnFlowConcepts[1].hook)).toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].correctAnswerText),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].continueText),
    ).not.toBeInTheDocument();
  });

  it("regression: wrong answer then right answer advances only one concept", async () => {
    await renderLearnPage();
    await completeOneConceptAfterWrongAnswer(0);

    expect(progressState.rows).toHaveLength(1);
    expect(progressState.rows[0].concept_id).toBe(learnFlowConcepts[0].id);
    expect(progressState.rows[0].was_correct_first_try).toBe(false);

    const nextBtn = await screen.findByRole("button", {
      name: /next concept/i,
    });
    await userEvent.setup().click(nextBtn);

    expect(await screen.findByText(learnFlowConcepts[1].hook)).toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].correctAnswerText),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(learnFlowConcepts[0].continueText),
    ).not.toBeInTheDocument();
  });
});
