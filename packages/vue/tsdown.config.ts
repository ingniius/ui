import { defineConfig } from "tsdown";
import vue from "unplugin-vue/rolldown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/**/*.{ts,vue}"],
  unbundle: true,
  dts: { vue: true },
  plugins: [vue({ isProduction: true })],
  exports: {
    customExports: () => ({
      ".": {
        types: "./dist/index.d.ts",
        style: "./dist/index.css",
        import: "./dist/index.js",
      },
      "./nuxt": "./dist/nuxt.js",
      "./unplugin": "./dist/unplugin.js",
      "./vite": "./dist/vite.js",
      "./package.json": "./package.json",
      "./registry.json": "./registry.json",
    }),
  },
  external: [...Object.keys(pkg.peerDependencies || {})].map(
    (name) => new RegExp(`^${name}(/.*)?`),
  ),
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
