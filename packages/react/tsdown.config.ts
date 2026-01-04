import { defineConfig } from "tsdown";

import pkg from "./package.json" with { type: "json" };

export default defineConfig({
  copy: ["src/index.css"],
  entry: ["src/**/*.{ts,tsx}", "!src/**/*.spec.ts"],
  unbundle: true,
  dts: true,
  exports: {
    customExports: (e) => ({
      ".": {
        types: "./dist/index.d.mts",
        style: "./dist/index.css",
        import: "./dist/index.mjs",
      },
      ...cleanExports(e),
    }),
  },
  external: [...Object.keys(pkg.peerDependencies || {})].map(
    (name) => new RegExp(`^${name}(/.*)?`),
  ),
});

function cleanExports(e: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(e)
      .filter(([k]) => k !== ".")
      .map(([k, v]) => [k.replace(/^\.\/lib\//, "./"), v]),
  );
}
