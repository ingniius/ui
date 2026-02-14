import type { Plugin as VuePlugin } from "vue";

import type { NuxtApp } from "#app";

export const defineNuxtPlugin = (plugin: (nuxtApp: NuxtApp) => void) => {
  return {
    install(app) {
      app.runWithContext(() => plugin({ vueApp: app } as NuxtApp));
    },
  } satisfies VuePlugin;
};
