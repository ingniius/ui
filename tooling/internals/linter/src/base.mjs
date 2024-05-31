import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export const rules = {
  "@typescript-eslint/ban-ts-comment": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-unused-vars": "off",
};

export function defineConfig(...configs) {
  return tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    { rules },
    eslintConfigPrettier,
    ...(configs ?? []),
  );
}

export default defineConfig();
