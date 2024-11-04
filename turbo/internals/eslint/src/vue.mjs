import vuePlugin from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default [
  ...vuePlugin.configs["flat/base"],
  ...vuePlugin.configs["flat/essential"],
  ...vuePlugin.configs["flat/recommended"],
  ...vuePlugin.configs["flat/strongly-recommended"],
  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      "vue/no-multiple-template-root": "off",
      "vue/max-attributes-per-line": "off",
      "vue/multi-word-component-names": "off",
      "vue/one-component-per-file": "off",
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
