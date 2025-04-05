import type { Resolver } from "@nuxt/kit";
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from "@nuxt/schema";

import { addTemplate, addTypeTemplate } from "@nuxt/kit";
import colors from "tailwindcss/colors";

import type { ModuleOptions } from "./module";

export function addTemplates(options: ModuleOptions, nuxt: Nuxt, resolve: Resolver["resolve"]) {
  const templates = getTemplates(options, nuxt.options.appConfig.ui);
  for (const template of templates) {
    if (template.filename!.endsWith(".d.ts")) {
      addTypeTemplate(template as NuxtTypeTemplate);
    } else {
      addTemplate(template);
    }
  }

  nuxt.hook("prepare:types", ({ references }) => {
    references.push({ path: resolve("./runtime/types/app.config.d.ts") });
  });
}

function getTemplates(options: ModuleOptions, uiConfig: Record<string, any>) {
  const templates: NuxtTemplate[] = [];

  templates.push({
    filename: "types/ui.d.ts",
    getContents: () => `import type { defaultConfig } from 'tailwind-variants'
import colors from 'tailwindcss/colors'

const icons = ${JSON.stringify(uiConfig.icons)};

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | (string & {})
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {})

type AppConfigUI = {
  colors?: {
    ${options.theme?.colors?.map(color => `${color}?: Color`).join("\n\t\t")}
    neutral?: NeutralColor
  }
  icons?: Partial<typeof icons>
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

  return templates;
}
