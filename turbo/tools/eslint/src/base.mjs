import antfu from "@antfu/eslint-config";
import turbo from "eslint-plugin-turbo";

export const options = {
  type: "lib",
  formatters: { css: true, html: true, markdown: "prettier" },
  stylistic: { indent: 2, semi: true, quotes: "double" },
  typescript: {
    overrides: {
      "ts/explicit-function-return-type": "off",
    },
  },
};

export const rules = {
  "node/prefer-global/process": "off",
  "perfectionist/sort-imports": ["error", { tsconfigRootDir: "." }],
  "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],
  "unicorn/number-literal-case": "off",
};

/** @type {ReturnType<typeof antfu>} */
export default (configs) => antfu(options, { ignores: ["**/*.config.*"], plugins: { turbo } }, { rules }, ...configs);
