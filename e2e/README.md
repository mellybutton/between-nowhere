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

## Conventions

- One spec file per user-facing flow (auth, learn, practice, …).
- Use `page.goto("/")` — `baseURL` is set in `playwright.config.ts`.
- For tests that need pre-completed concepts, hit `POST /api/test/seed`
  with the `x-test-seed-token` header and the `TEST_SEED_TOKEN` runtime
  secret. See `src/routes/api.test.seed.ts` for the contract.
