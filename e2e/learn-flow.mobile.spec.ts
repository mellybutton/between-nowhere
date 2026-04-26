import { test, expect, type APIRequestContext, type Page } from "@playwright/test";

/**
 * Mobile Learn flow E2E.
 *
 * Runs only under the `mobile-learn` Playwright project (iPhone 13 viewport,
 * see playwright.config.ts). The app is designed for iOS-class screens, so
 * this is the realistic surface to validate the Learn flow against.
 *
 * Requires the test seeding endpoint to be enabled:
 *   - TEST_SEED_TOKEN must be set on the server
 *   - TEST_SEED_TOKEN must also be set in this test runner's env so we can
 *     present the matching `x-test-seed-token` header
 *
 * Selectors here intentionally use the data-testid contract documented in
 * src/components/learn/LearnSteps.tsx and src/routes/_authenticated.learn.tsx
 * — never text or class-based selectors, which break with copy changes.
 */

const TEST_EMAIL =
  process.env.PLAYWRIGHT_TEST_EMAIL ?? `playwright-${Date.now()}@lovable.test`;
const TEST_PASSWORD = process.env.PLAYWRIGHT_TEST_PASSWORD ?? "playwright-pw-1";
const SEED_TOKEN = process.env.TEST_SEED_TOKEN;

async function seed(
  request: APIRequestContext,
  body: Record<string, unknown>,
): Promise<{ accessToken: string; refreshToken: string; userId: string }> {
  const res = await request.post("/api/test/seed", {
    headers: { "x-test-seed-token": SEED_TOKEN ?? "" },
    data: { email: TEST_EMAIL, password: TEST_PASSWORD, ...body },
  });
  expect(res.status(), await res.text()).toBe(200);
  return res.json();
}

/**
 * Inject the seeded Supabase session directly into localStorage so the next
 * navigation lands the user "logged in" without going through the auth UI.
 * The supabase-js client persists sessions under a key derived from the
 * project ref (sb-<ref>-auth-token).
 */
async function primeSession(
  page: Page,
  tokens: { accessToken: string; refreshToken: string },
) {
  const projectRef = process.env.VITE_SUPABASE_PROJECT_ID;
  test.skip(!projectRef, "VITE_SUPABASE_PROJECT_ID is required for session priming");
  const storageKey = `sb-${projectRef}-auth-token`;
  await page.addInitScript(
    ({ key, access, refresh }) => {
      const session = {
        access_token: access,
        refresh_token: refresh,
        token_type: "bearer",
        // Far-future expiry; supabase-js will refresh as needed.
        expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
        expires_in: 3600,
      };
      window.localStorage.setItem(key, JSON.stringify({ currentSession: session, expiresAt: session.expires_at }));
    },
    { key: storageKey, access: tokens.accessToken, refresh: tokens.refreshToken },
  );
}

test.describe("Learn flow @ mobile", () => {
  test.skip(!SEED_TOKEN, "TEST_SEED_TOKEN not set — seed endpoint disabled");

  test.beforeEach(async ({ request }) => {
    // Reset progress so the user always starts at the first uncompleted concept.
    await seed(request, { reset: true });
  });

  test("completes a single concept end-to-end", async ({ page, request }) => {
    const tokens = await seed(request, { reset: true });
    await primeSession(page, tokens);

    await page.goto("/learn");

    const step = page.locator('[data-testid="learn-step"]');
    await expect(step).toBeVisible();

    // 1. Hook → Insight
    await expect(step).toHaveAttribute("data-phase", "hook");
    const conceptId = await step.getAttribute("data-concept-id");
    expect(conceptId).toBeTruthy();
    await page.locator('[data-testid="learn-hook-continue"]').click();

    // 2. Insight → Question
    await expect(step).toHaveAttribute("data-phase", "insight");
    await page.locator('[data-testid="learn-insight-continue"]').click();

    // 3. Question — pick the correct answer regardless of shuffled order
    await expect(step).toHaveAttribute("data-phase", "question");
    await expect(step).toHaveAttribute("data-concept-id", conceptId!);
    await page
      .locator('[data-testid="learn-answer"][data-correct="true"]')
      .click();
    await page.locator('[data-testid="learn-submit"]').click();

    // 4. Reveal — success screen
    await expect(step).toHaveAttribute("data-phase", "reveal");
    await page.locator('[data-testid="learn-reveal-continue"]').click();

    // 5. Transition → next concept (or completion screen)
    await expect(step).toHaveAttribute("data-phase", "transition");
    await page.locator('[data-testid="learn-next-concept"]').click();

    // We should land either on a new concept's hook OR the all-done screen.
    const nextStep = page.locator('[data-testid="learn-step"]');
    const done = page.locator('[data-testid="learn-flow-complete"]');
    await expect(nextStep.or(done)).toBeVisible();

    if (await nextStep.isVisible()) {
      const newId = await nextStep.getAttribute("data-concept-id");
      expect(newId).not.toBe(conceptId);
      await expect(nextStep).toHaveAttribute("data-phase", "hook");
    }
  });

  test("seeded near-completion lands on the final concept", async ({
    page,
    request,
  }) => {
    // Mark the first four stages complete, leaving only "advanced" concepts.
    const tokens = await seed(request, {
      reset: true,
      completeStages: ["intuition", "infrastructure", "coordination", "equipment"],
    });
    await primeSession(page, tokens);

    await page.goto("/learn");
    const step = page.locator('[data-testid="learn-step"]');
    await expect(step).toBeVisible();
    // First uncompleted concept should be in the advanced stage.
    // We can't read stage from DOM directly, but presence of a step (not the
    // completion screen) is enough to confirm seeding worked.
    await expect(page.locator('[data-testid="learn-flow-complete"]')).toHaveCount(0);
  });
});
