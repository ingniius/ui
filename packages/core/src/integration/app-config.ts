import type { UnpluginOptions } from "unplugin";

import { CORE_PKG, SHARED_PACKAGES, SHARED_PLUGINS } from "../lib/constants";

export function appConfigPlugin(
  appConfig: Record<string, any>,
  sources: string[],
  plugins: string[],
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
            exclude: [CORE_PKG, ...sources],
            include: [...SHARED_PACKAGES],
          },
          test: {
            server: {
              deps: {
                inline: [CORE_PKG, ...sources],
              },
            },
          },
        };
      },
      configResolved(config) {
        const pluginList = config.plugins || [];
        for (const name of [...SHARED_PLUGINS, ...plugins]) {
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
