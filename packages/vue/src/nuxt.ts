import { CORE_PACKAGES } from "@veehance/core/constants";
import {
  defaultOptions,
  getConfig,
  resolveColors,
  resolveUI,
} from "@veehance/core/helpers";
import type { Options } from "@veehance/core/types";

import {
  addComponentsDir,
  addImportsDir,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  hasNuxtModule,
} from "@nuxt/kit";
import type {} from "@nuxt/schema";
import { defu } from "defu";

import pkg from "../package.json" with { type: "json" };
import { addTemplates } from "./template";

type IgnoredOptions = "output" | "router" | "ui";

export interface ModuleOptions extends Omit<Options, IgnoredOptions> {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: pkg.name,
    version: pkg.version,
    configKey: "ui",
    compatibility: { nuxt: ">=4" },
  },
  defaults: defaultOptions,
  moduleDependencies: {
    "@nuxt/fonts": {
      version: ">=0.12",
      optional: true,
      defaults: { defaults: { weights: [400, 500, 600, 700] } },
    },
    "@nuxt/image": {
      version: ">=2",
      optional: true,
    },
    "@nuxtjs/color-mode": {
      version: ">=4",
      optional: true,
      defaults: { classSuffix: "", disableTransition: true },
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const c = await getConfig(process.cwd());

    // 0. CONFIGURATION
    options.css = defu(c?.css || {}, options.css);

    options.colorMode = c?.colorMode || hasNuxtModule("@nuxtjs/color-mode");
    options.fonts = c?.fonts || hasNuxtModule("@nuxt/fonts");
    options.image = c?.image || hasNuxtModule("@nuxt/image");

    options.theme = defu(c?.theme || {}, options.theme);
    options.theme.colors = resolveColors(options.theme.colors);

    nuxt.options.appConfig.ui = defu(
      nuxt.options.appConfig.ui || {},
      resolveUI(options.css, c?.ui?.components || {}, options.theme),
    );

    nuxt.hook("vite:extend", async ({ config }) => {
      const plugin = await import("@tailwindcss/vite").then((r) => r.default);
      config.plugins ||= [];
      config.plugins.push(plugin());
    });

    if (nuxt.options.builder !== "@nuxt/vite-builder") {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }

    // 1. COMPONENTS
    addComponentsDir({
      path: resolve("./lib/components"),
      prefix: options.prefix,
      pathPrefix: false,
    });

    // 2. COMPOSABLES
    addImportsDir(resolve("./lib/composables"));

    // 3. TEMPLATES
    addTemplates(options, nuxt, resolve);

    // 4. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.include.push(...CORE_PACKAGES);
    });
  },
});
