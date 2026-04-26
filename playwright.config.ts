import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for end-to-end tests.
 *
 * - Tests live in `e2e/` so they don't get picked up by Vitest (which scans `src/`).
 * - Spins up the Vite dev server automatically; reuses an already-running one
 *   locally to keep iteration fast.
 * - Single browser (Chromium) by default — add more in CI if needed.
 * - Reads `PLAYWRIGHT_BASE_URL` so you can target a deployed preview instead
 *   of localhost (useful for smoke-testing the seed endpoint against
 *   project--<id>-dev.lovable.app).
 */
const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 8080);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;
const isCI = !!process.env.CI;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      // Mobile viewport project — exercises the Learn flow at iPhone-class
      // dimensions. The app is designed for iOS-sized screens (~390×660 safe
      // area), so these are the most realistic environments to validate it in.
      // Run only the mobile-tagged specs to keep the matrix small:
      //   bun run e2e --project=mobile-learn-iphone-13
      //   bun run e2e --project=mobile-learn-iphone-se
      name: "mobile-learn-iphone-13",
      testMatch: /learn-flow\.mobile\.spec\.ts/,
      use: { ...devices["iPhone 13"] },
    },
    {
      // iPhone SE is the narrowest modern iOS viewport (375×667). If layout
      // breaks anywhere — clipped CTAs, overflowing answer text, off-screen
      // hint toggle — it surfaces here first.
      name: "mobile-learn-iphone-se",
      testMatch: /learn-flow\.mobile\.spec\.ts/,
      use: { ...devices["iPhone SE"] },
    },
  ],
  // Skip auto-starting the dev server when targeting a deployed URL.
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `bun run dev --port ${PORT}`,
        url: baseURL,
        reuseExistingServer: !isCI,
        timeout: 120_000,
        stdout: "ignore",
        stderr: "pipe",
      },
});
