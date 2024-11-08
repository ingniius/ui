import {
  addComponentsDir,
  addImportsDir,
  addPlugin,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  hasNuxtModule,
  installModule,
  useLogger,
} from "@nuxt/kit";

import { defu } from "defu";

import { name, version } from "../package.json";

export interface ModuleOptions {
  enabled?: boolean;
  disableGlobalStyles?: boolean;
}

const THEMING_KEY = "theming" as const;

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: THEMING_KEY,
    compatibility: {
      nuxt: ">=3.0.0",
    },
  },
  defaults: {
    enabled: true,
    disableGlobalStyles: false,
  },
  async setup({ enabled, ...options }, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const { info } = useLogger(THEMING_KEY);

    if (!enabled) {
      info(`Skipping ${name} setup, as module is disabled`);
      return;
    }

    // 1. RUNTIME
    const runtimeDir = resolve("./runtime");
    nuxt.options.build.transpile.push(runtimeDir);

    nuxt.options.alias["#ui-config"] = resolve("./runtime/config");
    nuxt.options.alias["#ui-system"] = resolve("./runtime/helpers");

    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, {
      colors: {
        primary: "emerald",
        secondary: "indigo",
        neutral: "zinc",
      },
      container: { base: "max-w-[var(--ui-container-width)]" },
      icons: {
        caution: "i-heroicons:exclamation-circle-20-solid",
        copy: "i-heroicons:clipboard-document-20-solid",
        dark: "i-heroicons:moon-20-solid",
        document: "i-heroicons:document-text-20-solid",
        external: "i-heroicons:arrow-up-right-20-solid",
        hash: "i-heroicons:hashtag-20-solid",
        light: "i-heroicons:sun-20-solid",
        menu: "i-heroicons:bars-3-20-solid",
        next: "i-heroicons:arrow-right-20-solid",
        note: "i-heroicons:information-circle-20-solid",
        prev: "i-heroicons:arrow-left-20-solid",
        system: "i-heroicons:computer-desktop-20-solid",
        tip: "i-heroicons:light-bulb-20-solid",
        warning: "i-heroicons:exclamation-triangle-20-solid",
      },
    });

    if (!options.disableGlobalStyles) {
      nuxt.options.css.push(resolve(runtimeDir, "ui.css"));
    }

    // 2. CONFIGURATION
    if (!hasNuxtModule("@nuxt/image")) await installModule("@nuxt/image");
    if (!hasNuxtModule("@nuxt/ui")) await installModule("@nuxt/ui");

    if (!hasNuxtModule("@vueuse/nuxt")) await installModule("@vueuse/nuxt");

    if (!hasNuxtModule("@nuxt/content")) await installModule("@nuxt/content");
    if (!hasNuxtModule("@nuxtjs/mdc")) await installModule("@nuxtjs/mdc");

    nuxt.options.content = defu(nuxt.options.content, {
      experimental: { search: { indexed: false } },
      navigation: { fields: ["icon"] },
    });

    nuxt.options.mdc = defu(nuxt.options.mdc, {
      components: { map: { kbd: "ProseKbd" } },
      highlight: {
        theme: {
          light: "material-theme-lighter",
          default: "material-theme",
          dark: "material-theme-palenight",
        },
      },
    });

    // 3. COMPONENTS
    for (const dir of ["elements", "layout", "vendors"]) {
      addComponentsDir({
        path: resolve(runtimeDir, "components", dir),
        prefix: nuxt.options.ui.prefix,
        pathPrefix: false,
        watch: false,
      });
    }

    // 4. COMPOSABLES
    addImportsDir(resolve(runtimeDir, "composables"));

    // 5. PLUGINS
    addPlugin({ src: resolve(runtimeDir, "plugins", "presets") });

    // 6. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
      config.optimizeDeps.include.push(
        "@vueuse/core",
        "clsx",
        "defu",
        "radix-vue",
        "tailwind-merge",
        "tailwind-variants",
      );
    });
  },
});
