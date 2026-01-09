import { genSafeVariableName } from "knitwork";
import MagicString from "magic-string";
import { resolvePathSync } from "mlly";
import { join } from "pathe";
import { globSync } from "tinyglobby";
import type { UnpluginOptions } from "unplugin";

import { runtimeDir } from "../unplugin";

export function pluginsPlugin() {
  const plugins = globSync(["**/*", "!*.d.ts"], {
    cwd: join(runtimeDir, "plugins"),
    absolute: true,
  });

  plugins.unshift(
    resolvePathSync("../lib/base/plugins/head", {
      extensions: [".ts", ".js"],
      url: import.meta.url,
    }),
    resolvePathSync("../lib/base/plugins/color-mode", {
      extensions: [".ts", ".js"],
      url: import.meta.url,
    }),
  );

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
