import { defineConfig } from "@vee-ui/linter/nuxt";

export default defineConfig(
  {
    features: {
      tooling: true,
    },
  },
  {
    settings: {
      tailwindcss: {
        config: "./tailwind.config.ts",
      },
    },
  },
);
