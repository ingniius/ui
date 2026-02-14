import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/**/*.ts", "!src/**/*.spec.ts"],
  unbundle: true,
  dts: true,
  exports: {
    customExports: () => ({
      ".": {
        types: "./dist/index.d.ts",
        style: "./dist/index.css",
        import: "./dist/index.js",
      },
      "./iconset/*": "./dist/iconset/*.js",
      "./iconset": "./dist/iconset/index.js",
      "./locale/*": "./dist/locale/*.js",
      "./locale": "./dist/locale/index.js",
      "./preset/*": "./dist/preset/*.js",
      "./preset": "./dist/preset/index.js",
      "./theme/*": "./dist/theme/*.js",
      "./theme": "./dist/theme/index.js",
      "./helpers": "./dist/lib/helpers/index.js",
      "./types": "./dist/lib/types/index.js",
      "./utils": "./dist/lib/utils/index.js",
      "./package.json": "./package.json",
    }),
  },
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    "node:fs",
    "node:path",
    "#build",
  ].map((name) => new RegExp(`^${name}(/.*)?`)),
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
