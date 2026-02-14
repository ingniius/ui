import {
  generateAppConfig,
  generateAppConfigUI,
  generateIconset,
} from "@veehance/core/functions";
import { getTemplates as getRawTemplates } from "@veehance/core/template";
import type { Dict, Stringable, Template, Token } from "@veehance/core/types";

import { addTemplate, addTypeTemplate, type Resolver } from "@nuxt/kit";
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from "@nuxt/schema";

import type { ModuleOptions } from "./nuxt";

export function addTemplates(
  options: ModuleOptions,
  nuxt: Nuxt,
  resolve: Resolver["resolve"],
) {
  const templates = getTemplates(options, nuxt.options.appConfig.ui, null, [
    nuxt.options.app?.rootAttrs?.class,
    nuxt.options.app?.head?.htmlAttrs?.class,
    nuxt.options.app?.head?.bodyAttrs?.class,
  ]);

  for (const template of templates) {
    if (template.filename?.endsWith(".d.ts")) {
      addTypeTemplate(template as NuxtTypeTemplate);
    } else {
      addTemplate(template as NuxtTemplate);
    }
  }

  nuxt.hook("prepare:types", ({ references }) => {
    references.push({ path: resolve("./lib/types/build.d.ts") });
  });
}

export function getTemplates(
  options: ModuleOptions,
  ui: Dict<string, Dict>,
  router?: boolean | Token["router"] | null,
  inlineConfigs?: (Stringable | undefined)[],
) {
  const templates: Template[] = getRawTemplates(
    { ...options, ui },
    inlineConfigs,
  );

  if (router !== null) {
    templates.push({
      filename: "app.config.ts",
      write: true,
      getContents: () => generateAppConfig(ui, options),
    });
  }

  if (router !== null) {
    templates.push({
      filename: "ui/components.ts",
      write: true,
      getContents: () => generateVueComponents(options, router),
    });
  } else {
    templates.push({
      filename: "ui/components.ts",
      write: true,
      getContents: () => generateNuxtComponents(options, router),
    });
  }

  templates.push({
    filename: "ui/icons.ts",
    write: true,
    getContents: () => generateIconset(ui.icons),
  });

  if (router !== null) {
    templates.push({
      filename: "ui/imports.ts",
      write: true,
      getContents: () => generateVueImports(router),
    });
  } else {
    templates.push({
      filename: "ui/imports.ts",
      write: true,
      getContents: () => generateNuxtImports(options),
    });
  }

  templates.push({
    filename: "ui/index.ts",
    write: true,
    getContents: () => {
      return `export * from './components'\nexport * from './icons'\nexport * from './imports'\n`;
    },
  });

  templates.push({
    filename: "types/ui.d.ts",
    getContents: () => {
      return `${generateAppConfigUI(ui, options)}
declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: AppConfigUI
  }
}

export {}
`;
    },
  });

  return templates;
}

/* -------------------------------------------------------------------------- */
/* generators                                                                 */
/* -------------------------------------------------------------------------- */

function generateVueComponents(
  options: ModuleOptions,
  router?: boolean | Token["router"] | null,
) {
  const imageExport = resolveImageRegistry(options.image, router);
  return `export { default as UApp } from '@veehance/vue/app'
export { default as UContainer } from '@veehance/vue/container'
export { default as UIcon } from '@veehance/vue/icon'
export { default as UImage } from '@veehance/vue/image'
export { default as UMain } from '@veehance/vue/main'

${imageExport}\n`;
}

function generateNuxtComponents(
  options: ModuleOptions,
  router?: boolean | Token["router"] | null,
) {
  const imageExport = resolveImageRegistry(options.image, router);
  return `${imageExport}\n`;
}

function generateVueImports(router?: boolean | Token["router"] | null) {
  const useRouterExport = resolveUseRouterRegistry(router);
  return `export { defineNuxtPlugin } from '@veehance/vue/define-nuxt-plugin'
export { useAppConfig } from '@veehance/vue/use-app-config'
export { useColorMode } from '@veehance/vue/use-color-mode'
export { useHead } from '@veehance/vue/use-head'
export { useIcon } from '@veehance/vue/use-icon'
export { useLocale } from '@veehance/vue/use-locale'
${useRouterExport}
export { useNuxtApp } from '@veehance/vue/use-nuxt-app'\n`;
}

function generateNuxtImports(options: ModuleOptions) {
  const useColorModeExport = resolveUseColorModeRegistry(options.colorMode);
  return `export { defineNuxtPlugin, useAppConfig, useHead, useNuxtApp, useRoute, useRouter } from 'nuxt/app'
${useColorModeExport}
export { useIcon } from '@veehance/vue/use-icon'
export { useLocale } from '@veehance/vue/use-locale'\n`;
}

/* -------------------------------------------------------------------------- */
/* resolvers                                                                  */
/* -------------------------------------------------------------------------- */

function resolveImageRegistry(
  feature?: boolean | null,
  router?: boolean | Token["router"] | null,
) {
  if (feature === null || router === null)
    return feature
      ? `export { default as Image } from '../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue'`
      : `export const Image = 'img'`;

  switch (feature) {
    case true:
      return `export { Image } from '@unpic/vue'`;
    default:
      return `export const Image = 'img'`;
  }
}

function resolveUseColorModeRegistry(feature?: boolean) {
  if (!feature)
    return `export { useColorMode } from '@veehance/vue/use-color-mode'`;
  return `export { useColorMode } from '../../node_modules/@nuxtjs/color-mode/dist/runtime/composables'`;
}

function resolveUseRouterRegistry(router?: boolean | Token["router"] | null) {
  switch (router) {
    case "inertia":
      return `export { useRoute, useRouter } from '@veehance/vue/use-router/inertia'`;
    case "tanstack":
      return `export { useRoute, useRouter } from '@veehance/vue/use-router/tanstack'`;
    case true:
      return `export { useRoute, useRouter } from '@veehance/vue/use-router'`;
    default:
      return `export { useRoute, useRouter } from '@veehance/vue/use-router/base'`;
  }
}
