import { getConfig } from "@veehance/core/config";
import {
  CORE_PACKAGES,
  THEME_KEY,
  VUE_PACKAGES,
} from "@veehance/core/constants";
import {
  resolveColors,
  resolveOptions,
  resolveUI,
} from "@veehance/core/helpers";
import type { Options } from "@veehance/core/types";

import {
  addComponentsDir,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  getLayerDirectories,
  hasNuxtModule,
} from "@nuxt/kit";
import { defu } from "defu";

import { name, version } from "../package.json" with { type: "json" };
import { addTemplates } from "./template";

type IgnoredOptions = "dts" | "output" | "router" | "ui";

export interface ModuleOptions extends Omit<Options, IgnoredOptions> {}

export default defineNuxtModule<ModuleOptions>({
  meta: { name, version, configKey: "ui", compatibility: { nuxt: ">=4" } },
  defaults: {},
  moduleDependencies: {
    "@nuxt/fonts": {
      version: ">=0.12",
      optional: true,
      defaults: { defaults: { weights: [400, 500, 600, 700] } },
    },
    "@nuxt/image": {
      version: ">=2",
      optional: true,
      defaults: { format: ["webp"], provider: "auto" },
    },
    "@nuxtjs/color-mode": {
      version: ">=4",
      optional: true,
      defaults: {
        classSuffix: "",
        dataValue: "theme",
        disableTransition: true,
        storageKey: THEME_KEY,
      },
    },
  },
  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    const config = getConfig(process.cwd());
    const options = resolveOptions(
      config,
      {
        colorMode: hasNuxtModule("@nuxtjs/color-mode"),
        fonts: hasNuxtModule("@nuxt/fonts"),
        image: hasNuxtModule("@nuxt/image"),
        css: { variables: false },
      },
      _options,
    );

    options.theme ??= {};
    options.theme.colors = resolveColors(options.theme.colors);

    nuxt.options.appConfig.ui = defu(
      nuxt.options.appConfig.ui || {},
      resolveUI(options),
    );

    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [
      nuxt.options.app.rootAttrs.class,
      `${options.css?.prefix ? `${options.css.prefix}:` : ""}isolate`,
    ]
      .filter(Boolean)
      .join(" ");

    const layers = getLayerDirectories(nuxt).map((layer) => layer.app);
    for (const layer of layers) {
      options.css?.sources?.push(`${layer}**/*.{js,mjs,ts,vue}`);
    }

    nuxt.hook("vite:extend", async ({ config }) => {
      const plugin = await import("@tailwindcss/vite").then((r) => r.default);
      config.plugins ||= [];
      config.plugins.push(plugin() as any);
    });

    if (nuxt.options.builder !== "@nuxt/vite-builder") {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }

    // 1. COMPONENTS
    addComponentsDir({
      path: resolve("./lib/components/ui"),
      prefix: options.prefix,
      pathPrefix: false,
    });

    if (options.colorMode) {
      addComponentsDir({
        path: resolve("./lib/components/color-mode"),
        prefix: "ColorMode",
        pathPrefix: false,
      });
    }

    // 2. COMPOSABLES
    addImportsDir(resolve("./lib/composables"));

    // 3. PLUGINS
    addPlugin({ src: resolve("./lib/plugins/color") });

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
