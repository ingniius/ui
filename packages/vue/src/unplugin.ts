import { resolveOptions } from "@veehance/core/helpers";
import basePlugin, {
  type PluginOptions as BaseOptions,
} from "@veehance/core/vite";

import { defu } from "defu";
import { createUnplugin, type UnpluginOptions } from "unplugin";

export interface PluginOptions extends BaseOptions {
  /**
   * - `true` (default): Use vue-router integration
   * - `false`: Disable routing, use anchor tags
   * - `'inertia'`: Use inertia compatibility layer
   * @defaultValue `true`
   */
  router?: boolean | "inertia";
}

export default createUnplugin<PluginOptions | undefined>(
  (_options = {}, _meta) => {
    const { router, ...options } = defu(
      _options,
      resolveOptions({
        core: { plugins: [], sources: ["@veehance/vue"] },
        colorMode: true,
        router: true,
      }),
    );

    console.log(router);
    return [basePlugin(options)].flat(1) as UnpluginOptions[];
  },
);
