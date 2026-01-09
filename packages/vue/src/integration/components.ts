import { VUE_PKG } from "@veehance/core/constants";

import { defu } from "defu";
import type { UnpluginContextMeta, UnpluginOptions } from "unplugin";
import AutoImportComponents from "unplugin-vue-components";
import type { Options as ComponentsOptions } from "unplugin-vue-components/types";

import type { PluginOptions } from "../unplugin";

export function componentsPlugin(
  options: PluginOptions,
  meta: UnpluginContextMeta,
) {
  const packagesToScan = [
    VUE_PKG,
    ...(Array.isArray(options.scanPackages) ? options.scanPackages : []),
  ];

  const { Link, LinkBase } = resolveSources(options.router);

  const pluginOptions = defu(options.components, <ComponentsOptions>{
    dts: true,
    exclude: [
      createExcludeRegex(packagesToScan),
      /[\\/]\.git[\\/]/,
      /[\\/]\.nuxt[\\/]/,
    ],
    resolvers: createResolvers(
      [
        { name: "Container", from: "@veehance/vue/components/Container" },
        { name: "Icon", from: "@veehance/vue/components/Icon" },
        { name: "Link", from: Link },
        { name: "LinkBase", from: LinkBase },
        { name: "Main", from: "@veehance/vue/components/Main" },
      ],
      options.prefix,
    ),
  });

  return [
    AutoImportComponents.raw(pluginOptions, meta) as UnpluginOptions,
  ] satisfies UnpluginOptions[];
}

function createExcludeRegex(packages: string[]) {
  const escaped = packages.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  return new RegExp(
    `[\\\\/]node_modules[\\\\/](?!\\.pnpm|${escaped.join("|")})`,
  );
}

function createResolvers(
  components: readonly { name: string; from: string }[],
  prefix = "",
) {
  return components.map(({ name, from }) => {
    const match = `${prefix}${name}`;
    return (componentName: string) =>
      componentName === match ? { name: "default", from } : undefined;
  });
}

function resolveSources(router: PluginOptions["router"]) {
  switch (router) {
    case "inertia":
      return {
        Link: "@veehance/vue/inertia/components/Link",
        LinkBase: "@veehance/vue/inertia/components/LinkBase",
      };
    case true:
      return {
        Link: "@veehance/vue/router/components/Link",
        LinkBase: "@veehance/vue/components/LinkBase",
      };
    default:
      return {
        Link: "@veehance/vue/base/components/Link",
        LinkBase: "@veehance/vue/components/LinkBase",
      };
  }
}
