import {
  CORE_PACKAGES,
  CORE_PKG,
  CORE_PLUGINS,
} from "@veehance/core/constants";
import type { Dict } from "@veehance/core/types";

import type { UnpluginOptions } from "unplugin";

export function appConfigPlugin(
  appConfig: Dict,
  options: { dependencies: string[]; sources: string[]; plugins: string[] },
) {
  return {
    name: "vee:ui:app-conf1g",
    enforce: "pre",
    resolveId(id) {
      if (id === "#build/app.config") return "virtual:app-config";
    },
    loadInclude: (id) => id === "virtual:app-config",
    load() {
      return `export default ${JSON.stringify(appConfig)}`;
    },
    vite: {
      config() {
        return {
          optimizeDeps: {
            exclude: [CORE_PKG, ...options.sources],
            include: [...CORE_PACKAGES, ...options.dependencies],
          },
          test: {
            server: {
              deps: {
                inline: [CORE_PKG, ...options.sources],
              },
            },
          },
        };
      },
      configResolved(config) {
        const pluginList = config.plugins || [];
        for (const name of [...CORE_PLUGINS, ...options.plugins]) {
          const matches = pluginList.filter((p) => p.name === name);
          if (matches.length > 1) {
            throw new Error(
              `[VeeUI] Multiple instances of \`${name}\` detected. VeeUI already includes this plugin.`,
            );
          }
        }
      },
    },
  } satisfies UnpluginOptions;
}
