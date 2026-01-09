import {
  generateCSS,
  generateIconSet,
  writeTemplate,
} from "@veehance/core/helpers";
import { ui } from "@veehance/core/theme";
import type { Dict } from "@veehance/core/types";

import { addTemplate, addTypeTemplate, type Resolver } from "@nuxt/kit";
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from "@nuxt/schema";
import { isNil } from "es-toolkit";
import { genExport } from "knitwork";
import { kebabCase } from "scule";

import type { ModuleOptions } from "./module";

export function addTemplates(
  options: ModuleOptions,
  nuxt: Nuxt,
  resolve: Resolver["resolve"],
) {
  const templates = getTemplates(options, nuxt.options.appConfig.ui, null);
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

export function getTemplates(
  options: ModuleOptions,
  uiConfig: Dict,
  router?: boolean | "inertia" | null,
) {
  const templates: NuxtTemplate[] = [];

  for (const component of Object.keys(ui)) {
    templates.push({
      filename: `theme/${kebabCase(component)}.ts`,
      write: true,
      getContents: () => writeTemplate(ui, component, options),
    });
  }

  templates.push({
    filename: "theme/index.ts",
    write: true,
    getContents: () =>
      [
        ...Object.keys(ui).map(
          (component) =>
            `export { default as ${component} } from './${kebabCase(component)}'`,
        ),
      ].join("\n"),
  });

  templates.push({
    filename: "types/ui.d.ts",
    getContents: () => {
      const iconKeys = Object.keys(uiConfig?.icons || {});
      const iconUnion = iconKeys.length
        ? iconKeys.map((i) => JSON.stringify(i)).join(" | ")
        : "string";

      return `import type * as ui from '#build/theme/index'

import type { Components, Dict, Color, NeutralColor } from '@veehance/core/types'

type IconsConfig = Dict<${iconUnion} | (string & {}), string>

type AppConfigUI = {
  colors?: {
    ${options.theme?.colors?.map((color: string) => `'${color}'?: Color`).join("\n\t\t")}
    neutral?: NeutralColor | (string & {})
  }
  components?: Components<typeof ui>
  icons?: Partial<IconsConfig>
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: AppConfigUI
  }
}

export {}
`;
    },
  });

  templates.push({
    filename: "iconset.ts",
    write: true,
    getContents: () => generateIconSet(uiConfig.icons),
  });

  templates.push({
    filename: "image.ts",
    write: true,
    getContents: ({ app }) => {
      const image = app?.components?.find(
        (c) =>
          c.pascalName === "NuxtImg" &&
          !/nuxt(?:-nightly)?\/dist\/app/.test(c.filePath),
      );

      return image
        ? genExport(image.filePath, [{ name: image.export, as: "default" }])
        : "export default 'img'";
    },
  });

  templates.push({
    filename: "link.ts",
    write: true,
    getContents: () => {
      if (isNil(router))
        return "export { default } from '@veehance/vue/components/Link'";
      switch (router) {
        case "inertia":
          return "export { default } from '@veehance/vue/inertia/components/Link'";
        case true:
          return "export { default } from '@veehance/vue/router/components/Link'";
        case false:
          return "export { default } from '@veehance/vue/base/components/Link'";
      }
    },
  });

  templates.push({
    filename: "ui.css",
    write: true,
    getContents: () =>
      // biome-ignore lint/style/noNonNullAssertion: safe_to_set
      generateCSS({ sources: ["./theme"], theme: options.theme! }),
  });

  return templates;
}
