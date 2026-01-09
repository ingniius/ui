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
    customExports: (e) => ({
      ".": {
        types: "./dist/index.d.ts",
        style: "./dist/index.css",
        import: "./dist/index.js",
      },
      ...cleanExports(e),
      "./plugin": "./plugin.d.ts",
    }),
  },
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
    "node:fs",
    "node:path",
    "node:url",
    "#app",
    "#build",
    "#components",
    "#imports",
  ].map((name) => new RegExp(`^${name}(/.*)?`)),
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});

function cleanExports(e: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(e)
      .filter(([k]) => k !== ".")
      .map(([k, v]) => [k.replace(/^\.\/lib\//, "./"), v]),
  );
}
