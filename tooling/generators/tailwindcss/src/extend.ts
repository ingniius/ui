import { defu } from "defu";
import defaultTheme from "tailwindcss/defaultTheme";

import type { IconsPluginOptions } from "@egoist/tailwindcss-icons";
import {
  dynamicIconsPlugin,
  getIconCollections,
  iconsPlugin,
} from "@egoist/tailwindcss-icons";

import type { Config } from "./types";

/**
 * @publicApi
 * @param config
 */
export function extendConfig(config?: Config) {
  const ui = defu(config?.ui, {
    framework: "vue" as const,
    icons: ["heroicons", "simple-icons"] as const,
  });

  return defu(
    {
      ...config,
      ui,
      content: Array.isArray(config?.content)
        ? { files: config.content }
        : config?.content || { files: [] },
      presets: [
        {
          plugins: [
            require("@headlessui/tailwindcss"),
            require("@tailwindcss/forms")({ strategy: "class" }),
            require("@tailwindcss/typography"),
            iconsPlugin(
              Array.isArray(ui.icons) || ui.icons === "all"
                ? { collections: getIconCollections(ui.icons) }
                : typeof ui.icons === "object"
                  ? (ui.icons as IconsPluginOptions)
                  : {},
            ),
            (ui.icons === "all" && ui.framework !== "nuxt") ??
              dynamicIconsPlugin(),
          ],
        },
        ...(config?.presets ?? []),
      ],
    },
    {
      content: {
        files: [
          "./node_modules/@vee-ui/system/**/*.{cjs,js,mjs,ts}",
          // VUE/NUXT
          ...(ui.framework === "vue" || ui.framework === "nuxt"
            ? ["./node_modules/@vee-ui/vue/**/*.{cjs,js,mjs,ts}"]
            : []),
        ],
      },
      darkMode: ["class", '[data-theme="dark"]'],
      theme: {
        container: {
          center: true,
          padding: "2rem",
          screens: {
            "2xl": "1400px",
          },
        },
        extend: {
          ...defaultTheme,
          colors: {
            ...defaultTheme.colors,
          },
        },
      },
    },
  ) as Config;
}
