import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";

beforeAll(() => {
  // jsdom doesn't implement scrollTo; TanStack Router calls it on navigation.
  window.scrollTo = (() => {}) as typeof window.scrollTo;
  // Tell React the test env supports act() so RTL/router don't warn.
  (globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
});

afterEach(() => {
  cleanup();
});
