import {
  addImports,
  addTemplate,
  createResolver,
  defineNuxtModule,
  extendViteConfig,
  installModule,
  useNuxt,
} from "@nuxt/kit";

import { defu } from "defu";
import { join } from "pathe";

import type { Options, UI } from "@vee-ui/system";
import type { Config } from "@vee-ui/tailwindcss";

import { name, version } from "../package.json";

export interface ModuleOptions extends Options {
  icons?: Config["icons"];
  disableGlobalStyles: false;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "ui" as const,
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    prefix: "u",
    icons: ["heroicons", "simple-icons"],
    disableGlobalStyles: false,
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // 1. RUNTIME
    const runtimeDir = resolve("./runtime");

    nuxt.options.build.transpile.push(runtimeDir);
    nuxt.options.alias["#ui/core"] = runtimeDir;

    if (!options.disableGlobalStyles) {
      nuxt.options.css.push("@vee-ui/vue/assets/bootstrap.css");
    }

    // 2. CONFIGURATION
    await installDeps(options, nuxt, { resolve, runtimeDir });

    // 3. COMPOSABLES
    for (const n of ["useExposeRef", "useUI"]) {
      addImports({
        from: `@vee-ui/vue/composables/${n}`,
        name: n,
        as: n,
        priority: -1,
      });
    }

    // 4. OPTIMIZATION
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.exclude = config.optimizeDeps.exclude || [];
      config.optimizeDeps.include.push(
        "@vee-ui/system",
        "@vee-ui/util",
        "@vee-ui/vue",
        "@vueuse/core",
      );
    });
  },
});

async function installDeps(
  moduleOptions: ModuleOptions,
  nuxt = useNuxt(),
  {
    resolve,
    runtimeDir,
  }: {
    resolve: (...path: string[]) => string;
    runtimeDir: string;
  },
) {
  nuxt.hook("tailwindcss:config", function () {
    nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui, {
      strategy: "merge" as const,
    });
  });

  const tailwindConfig = addTemplate({
    filename: "ui.config.cjs",
    write: true,
    getContents: () =>
      `
const extendConfig = require("@vee-ui/tailwindcss");

module.exports = extendConfig({
  content: {
    files: [
      ${JSON.stringify(resolve(runtimeDir, "components/**/*.{cjs,js,mjs,ts,vue}"))},
    ],
  },
  ui: {
    framework: "nuxt",
    icons: ${JSON.stringify(moduleOptions.icons)},
  },
});
    `.trim(),
  });

  await installModule(
    "@nuxtjs/tailwindcss",
    defu(
      {
        exposeConfig: true,
        config: { darkMode: "class" },
        configPath: [
          tailwindConfig.dst,
          join(nuxt.options.rootDir, "tailwind.config"),
        ],
      },
      nuxt.options.tailwindcss,
    ),
  );
}

declare module "nuxt/schema" {
  interface AppConfig {
    ui: UI;
  }
}

declare module "@nuxt/schema" {
  interface AppConfig {
    ui: UI;
  }
}
