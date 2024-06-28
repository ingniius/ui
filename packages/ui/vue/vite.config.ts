import { defineConfig } from "vitest/config";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

import { resolve } from "node:path";

import { sync } from "glob";

export default defineConfig(({ mode }) => ({
  build: {
    cssCodeSplit: true,
    lib: {
      entry: sync(resolve(__dirname, "src/**/*.{ts,vue}"), {
        ignore: ["src/**/*.spec.{ts,vue}"],
      }),
      fileName,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "@vee-ui/system",
        "@vee-ui/util",
        "@egoist/tailwindcss-icons",
        "@headlessui/vue",
        "@vueuse/core",
        "defu",
        "scule",
        "vue",
      ],
      output: {
        globals: { vue: "Vue" },
        preserveModules: true,
        preserveModulesRoot: "src",
        assetFileNames(chunkInfo) {
          return `${chunkInfo.name}`;
        },
      },
    },
  },
  plugins: [
    dts({ cleanVueFileName: true }),
    vue({ isProduction: mode === "production" }),
  ],
  resolve: {
    alias: {
      "@ui": resolve(__dirname, "./src/runtime"),
      ...(mode !== "production"
        ? {
            "@vee-ui/system": resolve(__dirname, "./../../core/system/src"),
            "@vee-ui/util": resolve(__dirname, "./../../core/util/src"),
          }
        : {}),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
}));

function fileName(ext: string, name: string) {
  if (name.includes(".vue"))
    return `${name.replace(".vue", "")}.${ext == "es" ? "mjs" : ext}`;
  return `${name}.${ext == "es" ? "mjs" : ext}`;
}
