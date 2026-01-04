import veehance from "@veehance/react/vite";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    veehance({ router: false }),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});

export default config;
