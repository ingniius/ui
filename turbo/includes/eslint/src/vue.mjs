import prettier from "eslint-config-prettier";
import turbo from "eslint-plugin-turbo";
import vue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  {
    ignores: ["**/build/", "**/dist/", "**/*.config.*"],
    ...prettier,
  },
  {
    files: ["**/*.mjs", "**/*.ts", "**/*.vue"],
    plugins: { turbo },
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  ...vue.configs["flat/base"],
  ...vue.configs["flat/essential"],
  ...vue.configs["flat/recommended"],
  ...vue.configs["flat/strongly-recommended"],
  {
    files: ["**/*.vue"],
    rules: {
      "import/first": "off",
      "import/order": "off",
      "vue/html-indent": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",
      "vue/no-template-shadow": "off",
      "vue/one-component-per-file": "off",
      "vue/require-default-prop": "off",
      "vue/singleline-html-element-content-newline": "off",
    },
    languageOptions: {
      parserOptions: {
        parser: {
          js: "espree",
          jsx: "espree",
          mjs: "espree",
          ts: tseslint.parser,
          tsx: tseslint.parser,
          mts: tseslint.parser,
        },
        extraFileExtensions: [".vue"],
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
