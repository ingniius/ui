import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

import eslintConfigPrettier from "eslint-config-prettier";
import tailwind from "eslint-plugin-tailwindcss";

import { rules } from "./base.mjs";

export function defineConfig(options, ...configs) {
  return createConfigForNuxt(
    options ?? {},
    eslintConfigPrettier,
    ...tailwind.configs["flat/recommended"],
    ...(configs ?? []),
  ).append({
    rules: {
      ...rules,
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cx"],
      },
    },
  });
}

export default defineConfig();
