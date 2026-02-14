import ui from "@veehance/vue/vite";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    ui({ router: true }),
    vue(),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
