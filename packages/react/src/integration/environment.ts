import {
  CORE_KEY,
  CORE_PACKAGES,
  CORE_PLUGINS,
  REACT_INERTIA_PACKAGES,
  REACT_KEY,
  REACT_PACKAGES,
  REACT_ROUTER_PACKAGES,
  REACT_TANSTACK_PACKAGES,
  REACT_VITE_PACKAGES,
} from "@veehance/core/constants";

import type { UnpluginOptions } from "unplugin";

import type { PluginOptions as Options } from "../unplugin";

export function environmentPlugin(options: Options) {
  const shouldExclude = options.router === true || options.router === null;
  return {
    name: "vee:ui:environment",
    enforce: "pre",
    vite: {
      config() {
        return {
          optimizeDeps: {
            exclude: [
              ...[CORE_KEY, REACT_KEY],
              ...(!shouldExclude ? ["next-themes"] : []),
            ],
            include: [
              ...CORE_PACKAGES,
              ...REACT_PACKAGES,
              ...REACT_VITE_PACKAGES,
              ...resolvePackages(options.router),
              ...(options.image ? ["@unpic/react"] : []),
            ],
          },
          test: {
            server: {
              deps: {
                inline: [CORE_KEY, REACT_KEY],
              },
            },
          },
        };
      },
      configResolved(config) {
        const pluginList = config.plugins || [];
        for (const name of [...CORE_PLUGINS]) {
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

function resolvePackages(router: Options["router"]) {
  switch (router) {
    case "inertia":
      return REACT_INERTIA_PACKAGES;
    case "tanstack":
      return REACT_TANSTACK_PACKAGES;
    case true:
      return REACT_ROUTER_PACKAGES;
    default:
      return [];
  }
}
