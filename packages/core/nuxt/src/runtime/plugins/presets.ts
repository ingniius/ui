import type { AppConfig } from "@nuxt/schema";

import { defineNuxtPlugin, useAppConfig } from "#imports";

import { defu } from "defu";

export default defineNuxtPlugin(() => {
  const presets = {
    button: {
      primary: { color: "white", variant: "solid" },
      secondary: { color: "neutral", variant: "ghost" },
    },
  };

  const appConfig = useAppConfig() as AppConfig & { ui: { presets: Partial<typeof presets> } };
  return {
    provide: {
      ui: defu(appConfig.ui?.presets || {}, {
        button: {
          primary: { color: "white", variant: "solid" },
          secondary: { color: "neutral", variant: "ghost" },
        },
      }),
    },
  };
});
