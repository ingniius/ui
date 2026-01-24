import { getRawTemplates } from "@veehance/core/helpers";
import type { Dict } from "@veehance/core/types";

import { addTemplate, addTypeTemplate, type Resolver } from "@nuxt/kit";
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from "@nuxt/schema";

import type { ModuleOptions } from "./nuxt";

export function addTemplates(
  options: ModuleOptions,
  nuxt: Nuxt,
  resolve: Resolver["resolve"],
) {
  const templates = getTemplates(options, nuxt.options.appConfig.ui);
  for (const template of templates) {
    if (template.filename?.endsWith(".d.ts")) {
      addTypeTemplate(template as NuxtTypeTemplate);
    } else {
      addTemplate(template);
    }
  }

  nuxt.hook("prepare:types", ({ references }) => {
    references.push({ path: resolve("./lib/types/app.config.d.ts") });
  });
}

export function getTemplates(options: ModuleOptions, uiConfig: Dict) {
  const templates: NuxtTemplate[] = getRawTemplates(options);

  templates.push({
    filename: "types/ui.d.ts",
    getContents: () => {
      const colorUnion = options.theme?.colors?.length
        ? options.theme.colors.map((c) => JSON.stringify(c)).join(" | ")
        : "string";

      const iconKeys = Object.keys(uiConfig?.icons || {});
      const iconUnion = iconKeys.length
        ? iconKeys.map((i) => JSON.stringify(i)).join(" | ")
        : "string";

      return `import type * as ui from '#build/ui/index'

import type { UI } from '@veehance/core/types'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: UI<
      typeof ui,
      ${colorUnion},
      ${iconUnion}
    >
  }
}

export {}
`;
    },
  });

  return templates;
}
