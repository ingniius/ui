import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.spec.ts"],
  unbundle: true,
  dts: true,
  exports: {
    customExports: (e) => cleanExports(e),
  },
});

function cleanExports(e: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(e).map(([k, v]) => [k.replace(/^\.\/lib\//, "./"), v]),
  );
}
