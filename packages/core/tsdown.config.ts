import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/**/*.ts", "!src/**/*.spec.ts"],
  unbundle: true,
  dts: true,
  exports: {
    customExports: (e) => ({
      ".": {
        types: "./dist/index.d.ts",
        style: "./dist/index.css",
        import: "./dist/index.js",
      },
      ...cleanExports(e),
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

function cleanExports(e: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(e)
      .filter(([k]) => k !== ".")
      .map(([k, v]) => [k.replace(/^\.\/lib\//, "./"), v]),
  );
}
