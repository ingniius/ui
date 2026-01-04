import tailwindPlugin from "@tailwindcss/vite";
import { defu } from "defu";
import { createUnplugin, type UnpluginOptions } from "unplugin";

import { appConfigPlugin } from "./integration/app-config";
import { resolveColors, resolveConfig, resolveOptions } from "./lib/helpers";
import type { Colors, CVConfig, Icons, Theme } from "./lib/types";
import type * as ui from "./theme";

export interface PluginOptions {
  core?: {
    plugins?: string[];
    sources?: string[];
  };
  ui?: {
    colors?: Colors;
    components?: CVConfig<typeof ui>;
    icons?: Icons;
  };
  /**
   * Enable or disable color-mode integration
   * @defaultValue `true`
   */
  colorMode?: boolean;
  /**
   * Customize how the theme is generated
   */
  theme?: Theme;
}

export default createUnplugin<PluginOptions | undefined>(
  (_options = {}, _meta) => {
    const { core, ...options } = defu(
      _options,
      resolveOptions({
        core: { plugins: [], sources: [] },
        colorMode: true,
      }),
    );

    options.theme = options.theme || {};
    options.theme.colors = resolveColors(options.theme.colors);

    const appConfig = defu(
      { ui: options.ui, colorMode: options.colorMode },
      { ui: resolveConfig(options.theme.colors, options.theme.iconset) },
    );

    return [
      appConfigPlugin(appConfig, core.sources, core.plugins),
      tailwindPlugin(),
    ].flat(1) as UnpluginOptions[];
  },
);
