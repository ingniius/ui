import { genSafeVariableName } from "knitwork";
import MagicString from "magic-string";
import { resolvePathSync } from "mlly";
import type { UnpluginOptions } from "unplugin";

import type { PluginOptions as Options } from "../unplugin";

const resolveOptions = { extensions: [".ts", ".js"], url: import.meta.url };

export function pluginsPlugin(options: Options) {
  const plugins: string[] = [
    resolvePathSync("../lib/base/plugins/color-mode", resolveOptions),
    resolvePathSync("../lib/base/plugins/head", resolveOptions),
  ];

  if (!options?.css?.variables) {
    plugins.push(resolvePathSync("../lib/plugins/color", resolveOptions));
  }

  return {
    name: "vee:ui:plugins",
    enforce: "pre",
    resolveId(id) {
      if (id === "@veehance/vue/plugin") return "virtual:ui-plugins";
    },
    transform(code, id) {
      if (
        plugins.some((p) => id.startsWith(p)) &&
        code.includes("import.meta.client")
      ) {
        const s = new MagicString(code);
        s.replaceAll("import.meta.client", "true");
        if (s.hasChanged())
          return { code: s.toString(), map: s.generateMap({ hires: true }) };
      }
    },
    loadInclude: (id) => id === "virtual:ui-plugins",
    load() {
      return `${plugins.map((p) => `import ${genSafeVariableName(p)} from "${p}"`).join("\n")}

export default {
    install (app) {
    ${plugins.map((p) => `    app.use(${genSafeVariableName(p)})`).join("\n")}
    }
}`;
    },
  } satisfies UnpluginOptions;
}
