import { generateAppConfig, generateIconset } from "@veehance/core/functions";
import { getTemplates as getRawTemplates } from "@veehance/core/template";
import type {
  Dict,
  Options,
  Stringable,
  Template,
  Token,
} from "@veehance/core/types";

export function getTemplates(
  options: Options,
  ui: Dict<string, Dict>,
  router?: boolean | Token["router"] | null,
  inlineConfigs?: (Stringable | undefined)[],
) {
  const templates: Template[] = getRawTemplates(
    { ...options, ui },
    inlineConfigs,
  );

  templates.push({
    filename: "app.config.ts",
    write: true,
    getContents: () => generateAppConfig(ui, options),
  });

  templates.push({
    filename: "ui/components.ts",
    write: true,
    getContents: () => generateComponents(options, router),
  });

  templates.push({
    filename: "ui/icons.ts",
    write: true,
    getContents: () => generateIconset(ui.icons),
  });

  templates.push({
    filename: "ui/imports.ts",
    write: true,
    getContents: () => generateImports(router),
  });

  templates.push({
    filename: "ui/index.ts",
    write: true,
    getContents: () => {
      return `export * from './components'\nexport * from './icons'\nexport * from './imports'\n`;
    },
  });

  return templates;
}

/* -------------------------------------------------------------------------- */
/* generators                                                                 */
/* -------------------------------------------------------------------------- */

function generateComponents(
  options: Options,
  router?: boolean | Token["router"] | null,
) {
  const appExport = resolveAppRegistry(router);
  const imageExport = resolveImageRegistry(options.image, router);
  return `${appExport}
export { default as UContainer } from '@veehance/react/container'
export { default as UIcon } from '@veehance/react/icon'
export { default as UImage } from '@veehance/react/image'
export { default as UMain } from '@veehance/react/main'

${imageExport}\n`;
}

function generateImports(router?: boolean | Token["router"] | null) {
  const useColorModeExport = resolveUseColorModeRegistry(router);
  const useRouterExport = resolveUseRouterRegistry(router);
  return `export { useAppConfig } from '@veehance/react/use-app-config'
${useColorModeExport}
export { useHead } from '@veehance/react/use-head'
export { useIcon } from '@veehance/react/use-icon'
export { useLocale } from '@veehance/react/use-locale'
${useRouterExport}\n`;
}

/* -------------------------------------------------------------------------- */
/* resolvers                                                                  */
/* -------------------------------------------------------------------------- */

function resolveAppRegistry(router?: boolean | Token["router"] | null) {
  switch (router) {
    case null:
      return `export { default as UApp } from '@veehance/react/app/next'`;
    case "inertia":
      return `export { default as UApp } from '@veehance/react/app/inertia'`;
    case "tanstack":
      return `export { default as UApp } from '@veehance/react/app/tanstack'`;
    case true:
      return `export { default as UApp } from '@veehance/react/app'`;
    default:
      return `export { default as UApp } from '@veehance/react/app/base'`;
  }
}

function resolveImageRegistry(
  feature?: boolean | null,
  router?: boolean | Token["router"] | null,
) {
  if (feature === null || router === null)
    return feature || feature === null
      ? `export { default as Image } from 'next/image'`
      : `export const Image = 'img'`;

  switch (feature) {
    case true:
      return `export { Image } from '@unpic/react'`;
    default:
      return `export const Image = 'img'`;
  }
}

function resolveUseColorModeRegistry(
  router?: boolean | Token["router"] | null,
) {
  switch (router) {
    case null:
      return `export { useColorMode } from '@veehance/react/use-color-mode/next'`;
    case "inertia":
      return `export { useColorMode } from '@veehance/react/use-color-mode/inertia'`;
    case "tanstack":
      return `export { useColorMode } from '@veehance/react/use-color-mode/tanstack'`;
    case true:
      return `export { useColorMode } from '@veehance/react/use-color-mode'`;
    default:
      return `export { useColorMode } from '@veehance/react/use-color-mode/base'`;
  }
}

function resolveUseRouterRegistry(router?: boolean | Token["router"] | null) {
  switch (router) {
    case null:
      return `export { useRoute, useRouter } from '@veehance/react/use-router/next'`;
    case "inertia":
      return `export { useRoute, useRouter } from '@veehance/react/use-router/inertia'`;
    case "tanstack":
      return `export { useRoute, useRouter } from '@veehance/react/use-router/tanstack'`;
    case true:
      return `export { useRoute, useRouter } from '@veehance/react/use-router'`;
    default:
      return `export { useRoute, useRouter } from '@veehance/react/use-router/base'`;
  }
}
