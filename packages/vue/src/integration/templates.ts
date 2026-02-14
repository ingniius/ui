import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import type { Dict } from "@veehance/core/types";

import type { UnpluginOptions } from "unplugin";

import { getTemplates } from "../template";
import type { PluginOptions as Options } from "../unplugin";

export function templatesPlugin(options: Options, ui: Dict<string, Dict>) {
  const templates = getTemplates(options, ui, options.router);
  const templateKeys = new Set(templates.map((t) => `#build/${t.filename}`));

  async function writeTemplates(root: string) {
    const map: Dict<string, string> = {};
    const dir = join(root, options.output!);

    for (const template of templates) {
      if (!template.write || !template.filename) {
        continue;
      }

      const filePath = join(dir, template.filename);
      if (!existsSync(dirname(filePath))) {
        mkdirSync(dirname(filePath), { recursive: true });
      }

      writeFileSync(filePath, await template.getContents!({} as any));
      map[`#build/${template.filename}`] = filePath;
    }

    return map;
  }

  return {
    name: "vee:ui:templates",
    enforce: "pre",
    vite: {
      async config(config) {
        const alias = await writeTemplates(config.root || process.cwd());
        return { resolve: { alias } };
      },
    },
    resolveId(id) {
      if (templateKeys.has(`${id}.ts`)) {
        return `${id.replace("#build/", "virtual:ui-templates/")}.ts`;
      }
    },
    loadInclude: (id) =>
      templateKeys.has(id.replace("virtual:ui-templates/", "#build/")),
    load(id) {
      id = id.replace("virtual:ui-templates/", "#build/");
      return templates.find((t) => `#build/${t.filename}` === id)!.getContents!(
        {} as any,
      );
    },
  } satisfies UnpluginOptions;
}
