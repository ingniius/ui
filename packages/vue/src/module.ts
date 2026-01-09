import { CORE_PACKAGES, VUE_PACKAGES } from "@veehance/core/constants";
import {
  resolveColors,
  resolveConfig,
  resolveOptions,
} from "@veehance/core/helpers";
import type { Theme } from "@veehance/core/types";

import {
  addComponentsDir,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  hasNuxtModule,
} from "@nuxt/kit";
import type {} from "@nuxt/schema";
import { defu } from "defu";

import pkg from "../package.json" with { type: "json" };
import { addTemplates } from "./template";

export interface ModuleOptions {
  /**
   * Prefix for components
   * @defaultValue `U`
   */
  prefix?: string;
  /**
   * Enable or disable `@nuxtjs/color-mode` integration
   * @defaultValue `true`
   */
  colorMode?: boolean;
  /**
   * Enable or disable `@nuxt/fonts` integration
   * @defaultValue `true`
   */
  fonts?: boolean;
  /**
   * Customize how the theme is generated
   */
  theme?: Theme;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: pkg.name,
    version: pkg.version,
    configKey: "ui",
    compatibility: { nuxt: ">=4" },
  },
  defaults: resolveOptions({ colorMode: true, fonts: true }),
  moduleDependencies: {
    "@nuxt/fonts": {
      version: ">=0.12",
      optional: true,
      defaults: { defaults: { weights: [400, 500, 600, 700] } },
    },
    "@nuxtjs/color-mode": {
      version: ">=4",
      optional: true,
      defaults: { classSuffix: "", disableTransition: true },
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    options.colorMode = hasNuxtModule("@nuxtjs/color-mode");
    options.fonts = hasNuxtModule("@nuxt/fonts");

    // 0. CONFIGURATION
    options.theme = options.theme || {};
    options.theme.colors = resolveColors(options.theme.colors);

    nuxt.options.appConfig.ui = defu(
      nuxt.options.appConfig.ui || {},
      resolveConfig(options.theme.colors, options.theme.iconset),
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

    // 3. PLUGINS
    addPlugin({ src: resolve("./lib/plugins/colors") });

    // 4. TEMPLATES
    addTemplates(options, nuxt, resolve);

    // 5. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.include.push(...CORE_PACKAGES, ...VUE_PACKAGES);
    });
  },
});
