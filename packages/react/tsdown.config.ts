import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/**/*.{ts,tsx}"],
  unbundle: true,
  dts: true,
  exports: {
    customExports: () => ({
      ".": {
        types: "./dist/index.d.ts",
        style: "./dist/index.css",
        import: "./dist/index.js",
      },
      "./color-mode/image": "./dist/lib/components/color-mode/Image.js",
      "./app": "./dist/lib/components/ui/App.js",
      "./app/base": "./dist/lib/base/components/App.js",
      "./app/inertia": "./dist/lib/base/components/App.js",
      "./app/next": "./dist/lib/components/ui/App.js",
      "./app/tanstack": "./dist/lib/base/components/App.js",
      "./container": "./dist/lib/components/ui/Container.js",
      "./icon": "./dist/lib/components/ui/Icon.js",
      "./image": "./dist/lib/components/ui/Image.js",
      "./main": "./dist/lib/components/ui/Main.js",
      "./use-app-config": "./dist/lib/hooks/use-app-config.js",
      "./use-color-mode": "./dist/lib/hooks/use-color-mode.js",
      "./use-color-mode/base": "./dist/lib/base/hooks/use-color-mode.js",
      "./use-color-mode/inertia": "./dist/lib/base/hooks/use-color-mode.js",
      "./use-color-mode/next": "./dist/lib/hooks/use-color-mode.js",
      "./use-color-mode/tanstack": "./dist/lib/base/hooks/use-color-mode.js",
      "./use-head": "./dist/lib/hooks/use-head.js",
      "./use-icon": "./dist/lib/hooks/use-icon.js",
      "./use-locale": "./dist/lib/hooks/use-locale.js",
      "./use-router": "./dist/lib/router/hooks/use-router.js",
      "./use-router/base": "./dist/lib/base/hooks/use-router.js",
      "./use-router/inertia": "./dist/lib/inertia/hooks/use-router.js",
      "./use-router/next": "./dist/lib/hooks/use-router.js",
      "./use-router/tanstack": "./dist/lib/tanstack/hooks/use-router.js",
      "./types": "./dist/lib/types/index.js",
      "./template": "./dist/template.js",
      "./unplugin": "./dist/unplugin.js",
      "./vite": "./dist/vite.js",
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
