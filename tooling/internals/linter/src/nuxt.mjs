import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

import eslintConfigPrettier from "eslint-config-prettier";
import tailwind from "eslint-plugin-tailwindcss";

import { settings } from "./base.mjs";
import { rules } from "./vue.mjs";

export function defineConfig(options, ...configs) {
  return createConfigForNuxt(
    options ?? {},
    eslintConfigPrettier,
    ...tailwind.configs["flat/recommended"],
    ...(configs ?? []),
  ).append({ rules, settings });
}

export default defineConfig();
