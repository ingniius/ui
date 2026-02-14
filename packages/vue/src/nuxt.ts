import { defineNuxtModule } from "@nuxt/kit";

// biome-ignore lint/complexity/noBannedTypes: safe_to_set
export type ModuleOptions = {};

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "@veehance/vue",
    version: "0.0.0",
    configKey: "ui",
    compatibility: { nuxt: ">=4" },
  },
  defaults: {},
  moduleDependencies: {
    "@nuxt/fonts": {
      version: ">=0.12",
      optional: true,
      defaults: { defaults: { weights: [400, 500, 600, 700] } },
    },
  },
  async setup(_opts, nuxt) {
    nuxt.hook("vite:extend", async ({ config }) => {
      const plugin = await import("@tailwindcss/vite").then((r) => r.default);
      config.plugins ||= [];
      config.plugins.push(plugin() as any);
    });

    if (nuxt.options.builder !== "@nuxt/vite-builder") {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }
  },
});
