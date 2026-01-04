import { resolveOptions } from "@veehance/core/helpers";
import basePlugin, {
  type PluginOptions as BaseOptions,
} from "@veehance/core/vite";

import { defu } from "defu";
import { createUnplugin, type UnpluginOptions } from "unplugin";

export interface PluginOptions extends BaseOptions {
  /**
   * Router integration mode
   * - `true` (default): Use react-router integration
   * - `false`: Disable routing, use anchor tags
   * - `'inertia'`: Use inertia compatibility layer
   * - `'tanstack'`: Use tanstack compatibility layer
   * @defaultValue `true
   */
  router?: boolean | "inertia" | "tanstack";
}

export default createUnplugin<PluginOptions | undefined>(
  (_options = {}, _meta) => {
    const { router, ...options } = defu(
      _options,
      resolveOptions({
        core: { plugins: [], sources: ["@veehance/react"] },
        colorMode: true,
        router: true,
      }),
    );

    console.log(router);
    return [basePlugin(options)].flat(1) as UnpluginOptions[];
  },
);
