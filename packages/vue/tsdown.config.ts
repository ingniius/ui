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
      "./color-mode/image": "./dist/lib/components/color-mode/Image.js",
      "./app": "./dist/lib/components/ui/App.js",
      "./container": "./dist/lib/components/ui/Container.js",
      "./icon": "./dist/lib/components/ui/Icon.js",
      "./image": "./dist/lib/components/ui/Image.js",
      "./main": "./dist/lib/components/ui/Main.js",
      "./define-nuxt-plugin":
        "./dist/lib/base/composables/define-nuxt-plugin.js",
      "./use-app-config": "./dist/lib/base/composables/use-app-config.js",
      "./use-color-mode": "./dist/lib/base/composables/use-color-mode.js",
      "./use-head": "./dist/lib/base/composables/use-head.js",
      "./use-icon": "./dist/lib/composables/use-icon.js",
      "./use-locale": "./dist/lib/composables/use-locale.js",
      "./use-router": "./dist/lib/router/composables/use-router.js",
      "./use-router/base": "./dist/lib/base/composables/use-router.js",
      "./use-router/inertia": "./dist/lib/inertia/composables/use-router.js",
      "./use-router/tanstack": "./dist/lib/tanstack/composables/use-router.js",
      "./use-nuxt-app": "./dist/lib/base/composables/use-nuxt-app.js",
      "./types": "./dist/lib/types/index.js",
      "./utils": "./dist/lib/utils/index.js",
      "./nuxt": "./dist/nuxt.js",
      "./template": "./dist/template.js",
      "./unplugin": "./dist/unplugin.js",
      "./vite": "./dist/vite.js",
      "./package.json": "./package.json",
      "./plugin": "./plugin.d.ts",
    }),
  },
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    "node:fs",
    "node:path",
    "#app",
    "#build",
  ].map((name) => new RegExp(`^${name}(/.*)?`)),
  outExtensions: ({ format }) => {
    if (format === "es") return { js: ".js" };
    return {};
  },
});
