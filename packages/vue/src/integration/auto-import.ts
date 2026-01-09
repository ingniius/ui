import { defu } from "defu";
import { camelCase } from "scule";
import type { UnpluginContextMeta, UnpluginOptions } from "unplugin";
import AutoImport from "unplugin-auto-import";
import type { Options as AutoImportOptions } from "unplugin-auto-import/types";

import type { PluginOptions } from "../unplugin";

export function autoImportPlugin(
  options: PluginOptions,
  meta: UnpluginContextMeta,
): UnpluginOptions {
  const pluginOptions = defu(options.autoImport, <AutoImportOptions>{
    dts: true,
    resolvers: [
      ...createComposableResolvers([
        {
          file: "use-app-config",
          from: "@veehance/vue/base/composables",
        },
      ]),
    ],
  });

  return AutoImport.raw(pluginOptions, meta) as UnpluginOptions;
}

function createComposableResolvers(
  composables: readonly { file: string; from: string }[],
) {
  return composables.map(({ file, from }) => {
    const name = camelCase(file);
    return (importName: string) =>
      importName === name ? { name, from: `${from}/${file}` } : undefined;
  });
}
