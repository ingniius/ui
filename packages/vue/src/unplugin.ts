import { fileURLToPath } from "node:url";

import {
  VUE_BASE_PACKAGES,
  VUE_PACKAGES,
  VUE_PKG,
} from "@veehance/core/constants";
import {
  resolveColors,
  resolveConfig,
  resolveOptions,
} from "@veehance/core/helpers";
import type { ui } from "@veehance/core/theme";
import type { Colors, Components, Icons } from "@veehance/core/types";

import tailwindPlugin from "@tailwindcss/vite";
import { defu } from "defu";
import { normalize } from "pathe";
import { createUnplugin, type UnpluginOptions } from "unplugin";
import type { Options as AutoImportOptions } from "unplugin-auto-import/types";
import type { Options as ComponentsOptions } from "unplugin-vue-components/types";

import { appConfigPlugin } from "./integration/app-config";
import { autoImportPlugin } from "./integration/auto-import";
import { componentsPlugin } from "./integration/components";
import { environmentPlugin } from "./integration/environment";
import { pluginsPlugin } from "./integration/plugins";
import { templatesPlugin } from "./integration/templates";
import type { ModuleOptions } from "./module";

interface BaseOptions extends Omit<ModuleOptions, "colorMode" | "fonts"> {
  /** Whether to generate declaration files for auto-imported components. */
  dts?: boolean;
  /**
   * Override options for `unplugin-auto-import`
   */
  autoImport?: Partial<AutoImportOptions>;
  /**
   * Override options for `unplugin-vue-components`
   */
  components?: Partial<ComponentsOptions>;
  /**
   * Additional packages to scan for components using Veehance UI
   */
  scanPackages?: string[];
}

export interface PluginOptions extends BaseOptions {
  outDir?: string;
  ui?: {
    colors?: Partial<Colors>;
    components?: Components<typeof ui>;
    icons?: Partial<Icons>;
  };
  /**
   * Enable or disable `color-mode` integration
   * @defaultValue `true`
   */
  colorMode?: boolean;
  /**
   * - `true` (default): Use vue-router integration
   * - `false`: Disable routing, use anchor tags
   * - `'inertia'`: Use inertia compatibility layer
   * @defaultValue `true`
   */
  router?: boolean | "inertia";
}

export const runtimeDir = normalize(
  fileURLToPath(new URL("./lib", import.meta.url)),
);

export default createUnplugin<PluginOptions | undefined>(
  (_options = {}, meta) => {
    const options = defu(
      _options,
      {
        outDir: "./generated",
        colorMode: true,
        router: true,
      },
      resolveOptions({
        dts: true,
        autoImport: { dirs: [] },
        components: { dirs: [] },
      }),
    );

    options.theme = options.theme || {};
    options.theme.colors = resolveColors(options.theme.colors);

    const appConfig = defu(
      { ui: options.ui, colorMode: options.colorMode },
      { ui: resolveConfig(options.theme.colors, options.theme.iconset) },
    );

    return [
      environmentPlugin(options),
      options.dts && componentsPlugin(options, meta),
      options.dts && autoImportPlugin(options, meta),
      tailwindPlugin(),
      pluginsPlugin(),
      templatesPlugin(options, appConfig),
      appConfigPlugin(appConfig, {
        dependencies: [...VUE_BASE_PACKAGES, ...VUE_PACKAGES],
        plugins: ["unplugin-auto-import", "unplugin-vue-components"],
        sources: [VUE_PKG],
      }),
    ]
      .filter(Boolean)
      .flat(1) as UnpluginOptions[];
  },
);
