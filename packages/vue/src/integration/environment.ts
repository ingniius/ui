import MagicString from "magic-string";
import { type ResolveOptions, resolvePathSync } from "mlly";
import { normalize } from "pathe";
import type { UnpluginOptions } from "unplugin";

import type { PluginOptions } from "../unplugin";
import { runtimeDir } from "../unplugin";

export function environmentPlugin(
  options: PluginOptions & { router: NonNullable<PluginOptions["router"]> },
) {
  return {
    name: "vue:ui:environment",
    enforce: "pre",
    resolveId(id) {
      if (id === "#imports")
        return resolveStubs(options.router, {
          extensions: [".ts", ".js"],
          url: import.meta.url,
        });
    },
    transformInclude(id) {
      return normalize(id).includes(runtimeDir);
    },
    transform(code) {
      if (code.includes("import.meta.client")) {
        const s = new MagicString(code);
        s.replaceAll("import.meta.client", "true");
        if (s.hasChanged())
          return { code: s.toString(), map: s.generateMap({ hires: true }) };
      }
    },
  } satisfies UnpluginOptions;
}

function resolveStubs(
  router: PluginOptions["router"],
  options?: ResolveOptions,
) {
  switch (router) {
    case "inertia":
      return resolvePathSync("../lib/inertia/stubs", options);
    case true:
      return resolvePathSync("../lib/router/stubs", options);
    default:
      return resolvePathSync("../lib/base/stubs", options);
  }
}
