import veehance from "@veehance/react/vite";

import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    reactRouter(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    veehance({ router: true }),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});

export default config;
