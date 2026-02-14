import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.spec.ts"],
  unbundle: true,
  dts: true,
  exports: {
    customExports: () => ({
      ".": "./dist/index.js",
      "./program": "./dist/program.js",
      "./package.json": "./package.json",
    }),
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
