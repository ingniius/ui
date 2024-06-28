import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

import eslintConfigPrettier from "eslint-config-prettier";
import tailwind from "eslint-plugin-tailwindcss";

import { rules as base, settings } from "./base.mjs";

export const rules = {
  ...base,
  "vue/multi-word-component-names": "off",
  "vue/no-multiple-template-root": "off",
};

export function defineConfig(...configs) {
  return createConfigForNuxt(
    {},
    eslintConfigPrettier,
    ...tailwind.configs["flat/recommended"],
    ...(configs ?? []),
  ).append({ rules, settings });
}

export default defineConfig();
