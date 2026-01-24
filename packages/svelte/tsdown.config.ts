import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/{unplugin,vite}.ts", "!src/**/*.spec.ts"],
  clean: false,
  unbundle: true,
  dts: true,
  exports: {
    customExports: () => ({
      ".": {
        types: "./dist/index.d.ts",
        style: "./dist/index.css",
        svelte: "./dist/index.js",
      },
      "./container": formatOutput("./dist/components/Container", true),
      "./main": formatOutput("./dist/components/Main", true),
      "./types": formatOutput("./dist/types/index"),
      "./unplugin": formatOutput("./dist/unplugin"),
      "./vite": formatOutput("./dist/vite"),
      "./package.json": "./package.json",
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

function formatOutput(p: string, c: boolean = false) {
  return {
    types: `${p}.${c ? "svelte.d.ts" : "d.ts"}`,
    svelte: `${p}.${c ? "svelte" : "js"}`,
  };
}
