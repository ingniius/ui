import { addImportsDir, addPlugin, addVitePlugin, createResolver, defineNuxtModule, extendViteConfig, hasNuxtModule, installModule, useNuxt } from "@nuxt/kit";
import { defu } from "defu";

import { name, version } from "../package.json";
import { getUiConfig, getUiOptions, resolveColors } from "./defaults";
import { addTemplates } from "./templates";

export interface ModuleOptions {
  prefix?: string;
  colorMode?: boolean;
  fonts?: boolean;
  theme?: {
    colors?: string[];
    transitions?: boolean;
  };
}

export default defineNuxtModule<ModuleOptions>({
  meta: { name, version, configKey: "ui", compatibility: { nuxt: ">=3.13.0" } },
  defaults: getUiOptions(),
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    options.theme = options.theme || {};
    options.theme.colors = resolveColors(options.theme.colors);

    // 0. SETUP
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, getUiConfig(options.theme.colors));
    nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
    nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, "isolate"].filter(Boolean).join(" ");
    nuxt.options.router.options.scrollBehaviorType = "smooth";

    if (nuxt.options.builder === "@nuxt/vite-builder") {
      addVitePlugin(await import("@tailwindcss/vite").then(r => r.default));
    } else {
      nuxt.options.postcss.plugins["@tailwindcss/postcss"] = {};
    }

    // 1. RUNTIME
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);

    nuxt.options.alias["#ui/composables"] = resolve(runtimeDir, "composables");

    // 2. CONFIGURATION
    await registerModule("@nuxt/icon", "icon", { cssLayer: "components" });
    if (options.colorMode)
      await registerModule("@nuxtjs/color-mode", "colorMode", { classSuffix: "", disableTransition: true });
    if (options.fonts)
      await registerModule("@nuxt/fonts", "fonts", { experimental: { processCSSVariables: true } });

    // 3. COMPOSABLES
    addImportsDir(resolve(runtimeDir, "composables"));

    // 4. COMPOSABLES
    addPlugin({ src: resolve(runtimeDir, "plugins", "colors") });

    // 5. TEMPLATES
    addTemplates(options, nuxt, resolve);

    // 6. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
      config.optimizeDeps.include.push(
        "@vueuse/core",
        "es-toolkit",
        "reka-ui",
        "tailwind-variants",
        "tailwindcss/colors",
      );
    });
  },
});

async function registerModule(
  name: string,
  key: string,
  options: Record<string, any> = {},
  nuxt = useNuxt(),
) {
  if (!hasNuxtModule(name)) {
    await installModule(name, options);
  } else {
    (nuxt.options as any)[key] = defu((nuxt.options as any)[key], options);
  }
}
