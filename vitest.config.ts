import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // so `describe`, `it`, `expect` are available
    setupFiles: "./vitest.setup.ts",
    environment: "jsdom", // for DOM testing
  },
});
