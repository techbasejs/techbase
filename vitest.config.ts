// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "istanbul",
      include: ["**/src/**/*.ts"],
      exclude: ["**/tests/**/*.spec.ts"],
    },
    environment: "jsdom",
  },
});
