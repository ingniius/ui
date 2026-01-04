import { resolveOptions } from "@veehance/core/helpers";
import type { Theme } from "@veehance/core/types";

import { defineNuxtModule } from "@nuxt/kit";

import pkg from "../package.json" with { type: "json" };

export interface ModuleOptions {
  colorMode?: boolean;
  theme?: Theme;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: pkg.name.replace("vue", "nuxt"),
    version: pkg.version,
    configKey: "ui",
    compatibility: { nuxt: ">=4" },
  },
  defaults: resolveOptions({ colorMode: true }),
  moduleDependencies: {
    "@nuxt/fonts": {
      version: ">=0.12",
      optional: false,
      defaults: { defaults: { weights: [400, 500, 600, 700] } },
    },
    "@nuxtjs/color-mode": {
      version: ">=4",
      optional: false,
      defaults: { classSuffix: "", disableTransition: true },
    },
  },
  async setup(_options, nuxt) {
    nuxt.hook("vite:extend", async ({ config }) => {
      const plugin = await import("@tailwindcss/vite").then((r) => r.default);
      config.plugins ||= [];
      config.plugins.push(plugin());
    });

    if (nuxt.options.builder !== "@nuxt/vite-builder") {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }
  },
});
