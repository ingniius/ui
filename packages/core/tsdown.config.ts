import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

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
      "./locale/*": "./dist/locale/*.js",
      "./locale": "./dist/locale/index.js",
      "./theme/icon": "./dist/theme/icon/index.js",
      "./theme/preset": "./dist/theme/preset/index.js",
      "./theme/ui": "./dist/theme/ui/index.js",
      "./helpers": "./dist/lib/helpers/index.js",
      "./types": "./dist/lib/types/index.js",
      "./utils": "./dist/lib/utils/index.js",
      "./package.json": "./package.json",
    }),
  },
  external: [...Object.keys(pkg.peerDependencies || {}), "#build"].map(
    (name) => new RegExp(`^${name}(/.*)?`),
  ),
  hooks: {
    "build:before": () => ensureAppConfig(),
  },
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});

function ensureAppConfig() {
  const outFile = resolve("generated/app.config.ts");
  if (existsSync(outFile)) return;

  const appConfig = { ui: { css: { strategy: "merge", prefix: "" } } };

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(
    outFile,
    `export default ${JSON.stringify(appConfig, null, 2)};\n`,
    "utf8",
  );
}
