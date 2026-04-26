import { test, expect } from "@playwright/test";

/**
 * Basic smoke test: app loads and the landing page renders.
 * Confirms Playwright is wired up correctly end-to-end.
 */
test("home page loads", async ({ page }) => {
  await page.goto("/");
  // The landing page should produce a <title>; just assert a non-empty one.
  await expect(page).toHaveTitle(/.+/);
});
