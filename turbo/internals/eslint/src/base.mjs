import eslint from "@eslint/js";
import prettier from "eslint-config-prettier";
import tailwind from "eslint-plugin-tailwindcss";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default tseslint.config(
  {
    ignores: ["**/build/", "**/dist/", "**/*.config.*"],
    ...prettier,
  },
  {
    files: ["**/*.mjs", "**/*.ts", "**/*.tsx"],
    plugins: {
      turbo: turboPlugin,
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tailwind.configs["flat/recommended"],
    ],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      tailwindcss: {
        callees: ["cva", "cn"],
      },
    },
  },
);
