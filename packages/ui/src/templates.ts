import type { Resolver } from "@nuxt/kit";
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from "@nuxt/schema";

import { addTemplate, addTypeTemplate } from "@nuxt/kit";
import { isFunction } from "es-toolkit";
import { fileURLToPath } from "node:url";
import { kebabCase } from "scule";
import colors from "tailwindcss/colors";

import type { ModuleOptions } from "./module";

import * as theme from "./theme";

interface RuntimeResolver {
  resolve: Resolver["resolve"];
  runtimeDir: string;
}

export function addTemplates(options: ModuleOptions, nuxt: Nuxt, { resolve, runtimeDir }: RuntimeResolver) {
  const templates = getTemplates(options, nuxt);
  for (const template of templates) {
    if (template.filename!.endsWith(".d.ts")) {
      addTypeTemplate(template as NuxtTypeTemplate);
    } else {
      addTemplate(template);
    }
  }

  nuxt.hook("prepare:types", ({ references }) => {
    references.push({ path: resolve(runtimeDir, "types/app.config.d.ts") });
  });
}

export function getTemplates(options: ModuleOptions, nuxt: Nuxt) {
  const templates: NuxtTemplate[] = [];

  // THEME > UI
  for (const component in theme.ui) {
    templates.push({
      filename: `ui/${kebabCase(component)}.ts`,
      write: true,
      getContents: async () => {
        const json = await writeTemplate(
          component,
          theme.ui,
          "theme/ui",
          options,
        );
        return `export default ${json}`;
      },
    });
  }

  // THEME > INDEX
  templates.push({
    filename: "ui/index.ts",
    write: true,
    getContents: () => {
      let contents = "";

      contents += Object.keys(theme.ui)
        .sort()
        .map(
          component =>
            `export { default as ${component} } from './${kebabCase(component)}'`,
        )
        .join("\n");

      return contents;
    },
  });

  // TYPES > UI
  templates.push({
    filename: "types/ui.d.ts",
    getContents: () => `import * as ui from '#build/ui'
import type { DeepPartial } from '@iueev/ui'
import type { defaultConfig } from 'tailwind-variants'
import colors from 'tailwindcss/colors'

const icons = ${JSON.stringify(nuxt.options.appConfig.ui.icons)};

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | (string & {})
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {})

type AppConfigUI = {
  colors?: {
    ${options.theme?.colors?.map(color => `${color}?: Color`).join("\n\t\t")}
    neutral?: NeutralColor
  }
  components?: DeepPartial<typeof ui>
  icons?: Partial<typeof icons> & { [key: string]: string }
  tv?: typeof defaultConfig
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: AppConfigUI
  }
}

export {}
    `,
  });

  templates.push({
    filename: "ui.css",
    write: true,
    getContents: () => `@source "./ui";

@theme default {
  --color-old-neutral-50: ${colors.neutral[50]};
  --color-old-neutral-100: ${colors.neutral[100]};
  --color-old-neutral-200: ${colors.neutral[200]};
  --color-old-neutral-300: ${colors.neutral[300]};
  --color-old-neutral-400: ${colors.neutral[400]};
  --color-old-neutral-500: ${colors.neutral[500]};
  --color-old-neutral-600: ${colors.neutral[600]};
  --color-old-neutral-700: ${colors.neutral[700]};
  --color-old-neutral-800: ${colors.neutral[800]};
  --color-old-neutral-900: ${colors.neutral[900]};
  --color-old-neutral-950: ${colors.neutral[950]};
  ${[...(options.theme?.colors || []).filter(color => !colors[color as keyof typeof colors]), "neutral"].map(color => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => `--color-${color}-${shade}: var(--ui-color-${color}-${shade});`).join("\n\t")).join("\n\t")}
}
  `,
  });

  templates.push({
    filename: "ui-image-component.ts",
    write: true,
    getContents: ({ app }) => {
      const image = app?.components?.find(c => c.pascalName === "NuxtImg" && !c.filePath.includes("nuxt/dist/app"));
      return image ? `export { default } from "${image.filePath}"` : "export default \"img\"";
    },
  });

  return templates;
}

async function writeTemplate<T = any>(
  key: string,
  entries: T,
  path: string,
  uiConfig: Record<string, any>,
) {
  const template = (entries as any)[key];
  const result = isFunction(template) ? template(uiConfig) : template;
  const variants = Object.keys(result.variants || {});
  let json = JSON.stringify(result, null, 2);
  for (const variant of variants) {
    json = json.replace(
      new RegExp(`("${variant}": "[^"]+")`, "g"),
      "$1 as const",
    );
    json = json.replace(
      new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, "g"),
      (_, before, match, after) => {
        const replaced = match.replace(/("[^"]+")/g, "$1 as const");
        return `${before}${replaced}${after}`;
      },
    );
  }

  // For local development, directly import from entries path
  if (process.env.DEV) {
    return [
      `import template from ${JSON.stringify(fileURLToPath(new URL(`./${path}/${kebabCase(key)}`, import.meta.url)))}`,
      `const result = typeof template === 'function' ? template(${JSON.stringify(uiConfig)}) : template`,
      `const json = ${json}`,
      `export default result as typeof json`,
    ].join("\n");
  }

  return json;
}
