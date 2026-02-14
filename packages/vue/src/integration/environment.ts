import {
  CORE_KEY,
  CORE_PACKAGES,
  CORE_PLUGINS,
  VUE_INERTIA_PACKAGES,
  VUE_KEY,
  VUE_PACKAGES,
  VUE_ROUTER_PACKAGES,
  VUE_TANSTACK_PACKAGES,
  VUE_VITE_PACKAGES,
} from "@veehance/core/constants";

import type { UnpluginOptions } from "unplugin";

import type { PluginOptions as Options } from "../unplugin";

export function environmentPlugin(options: Options) {
  return {
    name: "vee:ui:environment",
    enforce: "pre",
    vite: {
      config() {
        return {
          optimizeDeps: {
            exclude: [CORE_KEY, VUE_KEY],
            include: [
              ...CORE_PACKAGES,
              ...VUE_PACKAGES,
              ...VUE_VITE_PACKAGES,
              ...resolvePackages(options.router),
              ...(options.image ? ["@unpic/vue"] : []),
            ],
          },
          test: {
            server: {
              deps: {
                inline: [CORE_KEY, VUE_KEY],
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
      return VUE_INERTIA_PACKAGES;
    case "tanstack":
      return VUE_TANSTACK_PACKAGES;
    case true:
      return VUE_ROUTER_PACKAGES;
    default:
      return [];
  }
}
