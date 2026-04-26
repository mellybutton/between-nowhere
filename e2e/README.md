# End-to-end tests (Playwright)

Tests that drive the real app in a real browser. Lives outside `src/` so it
doesn't collide with Vitest unit tests.

## Run

```bash
# First time only — install browser binaries
bunx playwright install chromium

# Run all e2e tests (boots the dev server automatically)
bun run e2e

# Open the interactive UI runner
bun run e2e:ui

# Run against a deployed preview instead of localhost
PLAYWRIGHT_BASE_URL=https://project--<id>-dev.lovable.app bun run e2e
```

## Projects

- `chromium` — desktop Chrome, default project. Runs every spec except the
  mobile-only ones.
- `mobile-learn-iphone-13` — iPhone 13 viewport (390×844). Runs
  `learn-flow.mobile.spec.ts`.
- `mobile-learn-iphone-se` — iPhone SE viewport (375×667), the narrowest
  modern iOS device. Runs the same spec — first place layout regressions
  (clipped CTAs, overflowing answer text) tend to appear.

The Learn flow is iOS-designed (~390×660 safe area), so both mobile projects
are the realistic surface to validate it.

```bash
# Desktop only
bun run e2e --project=chromium

# A single mobile viewport
bun run e2e --project=mobile-learn-iphone-13
bun run e2e --project=mobile-learn-iphone-se

# Both mobile viewports
bun run e2e --project=mobile-learn-iphone-13 --project=mobile-learn-iphone-se
```

The mobile Learn spec needs the test seeding endpoint enabled. Required env:

```bash
TEST_SEED_TOKEN=<same value the server has>
VITE_SUPABASE_PROJECT_ID=<for localStorage session priming>
# Optional: pin a known test user
PLAYWRIGHT_TEST_EMAIL=playwright@lovable.test
PLAYWRIGHT_TEST_PASSWORD=playwright-pw-1
```

Specs auto-skip if `TEST_SEED_TOKEN` isn't present, so CI without the secret
won't fail — it just won't exercise the Learn flow.

## Conventions

- One spec file per user-facing flow (auth, learn, practice, …).
- Use `page.goto("/")` — `baseURL` is set in `playwright.config.ts`.
- Always select via `data-testid` — never text or class names.
- For tests that need pre-completed concepts, hit `POST /api/test/seed`
  with the `x-test-seed-token` header and the `TEST_SEED_TOKEN` runtime
  secret. See `src/routes/api.test.seed.ts` for the contract.
