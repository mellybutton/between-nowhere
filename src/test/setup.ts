import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll } from "vitest";

beforeAll(() => {
  // jsdom doesn't implement scrollTo; TanStack Router calls it on navigation.
  // @ts-expect-error — patching test-only stub.
  window.scrollTo = () => {};
  // Tell React the test env supports act() so RTL/router don't warn.
  // @ts-expect-error — global flag read by react-dom.
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  cleanup();
});
