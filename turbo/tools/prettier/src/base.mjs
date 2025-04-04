/** @type {import("prettier").Config} */
export default {
  arrowParens: "always",
  overrides: [
    { files: "*.json.hbs", options: { parser: "json" } },
    { files: "*.mjs.hbs", options: { parser: "babel" } },
    { files: "*.ts.hbs", options: { parser: "typescript" } },
  ],
  printWidth: 120,
  proseWrap: "always",
  quoteProps: "consistent",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
};
