import veehance from "@veehance/react/vite";

import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const config = defineConfig({
  plugins: [
    devtools(),
    tanstackStart({
      router: { routesDirectory: "app" },
      srcDirectory: "src",
    }),
    react(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    veehance({ router: "tanstack" }),
  ],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});

export default config;
