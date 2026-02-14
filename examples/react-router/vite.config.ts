import ui from "@veehance/react/vite";

import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    ui({ router: true }),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
