import { defineConfig } from "vitest/config";
import { playwright }   from "@vitest/browser-playwright";

export default defineConfig ({
  test: {
    projects: [
      {
        test: {
          name: "browser",
          include: ["tests/browser/**/*.test.js"],
          browser: {
            enabled: true,
            provider: playwright (),
            // https://vitest.dev/config/browser/playwright
            instances: [
              { browser: "chromium" },
            ],
          },
        },
      },
      {
        test: {
          name: "node",
          include: ["tests/node/**/*.test.js"],
          environment: "node",
        },
      },
    ],
  },
});
