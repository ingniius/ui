import ui from "@veehance/vue/vite";

import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    devtools(),
    tanstackRouter({ autoCodeSplitting: true, target: "vue" }),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    ui({ router: "tanstack" }),
    vue(),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
