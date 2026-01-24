import { defineConfig } from "tsdown";
import vue from "unplugin-vue/rolldown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/**/*.{ts,vue}", "!src/**/*.spec.ts"],
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
      "./container": "./dist/lib/components/Container.js",
      "./main": "./dist/lib/components/Main.js",
      "./types": "./dist/lib/types/index.js",
      "./nuxt": "./dist/nuxt.js",
      "./template": "./dist/template.js",
      "./unplugin": "./dist/unplugin.js",
      "./vite": "./dist/vite.js",
      "./package.json": "./package.json",
    }),
  },
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
  ].map((name) => new RegExp(`^${name}(/.*)?`)),
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
