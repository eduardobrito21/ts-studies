import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["chapters/**/*.test.ts"],
    globals: false,
  },
});
