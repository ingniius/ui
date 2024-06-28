import eslint from "@eslint/js";

import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import tailwind from "eslint-plugin-tailwindcss";

export const rules = {
  "@typescript-eslint/ban-ts-comment": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-unused-vars": "off",
  "tailwindcss/no-custom-classname": "off",
};

export const settings = {
  tailwindcss: {
    callees: ["cn", "cx"],
  },
};

export function defineConfig(...configs) {
  return tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    ...tailwind.configs["flat/recommended"],
    { rules, settings },
    eslintConfigPrettier,
    ...(configs ?? []),
  );
}

export default defineConfig();
