import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    pool: "threads",
    maxWorkers: 1,
    fileParallelism: false,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/components/**/*.tsx", "src/app/**/*.tsx"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
