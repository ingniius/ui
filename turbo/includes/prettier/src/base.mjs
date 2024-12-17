/** @type {import("prettier").Config} */
export default {
  arrowParens: "always",
  importOrder: [
    "^@turbo|^vitest",
    "^node",
    "^@iueev/(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$|^~/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  jsxSingleQuote: false,
  overrides: [
    { files: "*.json.hbs", options: { parser: "json" } },
    { files: "*.mjs.hbs", options: { parser: "babel" } },
    { files: "*.ts.hbs", options: { parser: "typescript" } },
  ],
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  printWidth: 120,
  proseWrap: "always",
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
};
