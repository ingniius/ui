import type { UseHeadInput } from "@unhead/vue/types";
import { computed } from "vue";

import { defineNuxtPlugin, useAppConfig, useHead, useNuxtApp } from "#imports";

import { generateColor, generateShades } from "@veehance/core/helpers";

export default defineNuxtPlugin(() => {
  const appConfig = useAppConfig();
  const nuxtApp = useNuxtApp();

  const root = computed(() => {
    const { neutral, ...colors } = appConfig.ui.colors;

    return `@layer theme {
  :root, :host {
  ${Object.entries(appConfig.ui.colors)
    .map(([key, value]: [string, string]) => generateShades(key, value))
    .join("\n  ")}
  }
  
  :root, :host, .light {
  ${Object.keys(colors)
    .map((key) => generateColor(key, 500))
    .join("\n  ")}
  }
  
  .dark {
  ${Object.keys(colors)
    .map((key) => generateColor(key, 400))
    .join("\n  ")}
  }
}`;
  });

  const headData: UseHeadInput = {
    style: [{ innerHTML: () => root.value, tagPriority: -2, id: "ui-colors" }],
  };

  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    !nuxtApp.payload.serverRendered
  ) {
    const style = document.createElement("style");

    style.innerHTML = root.value;
    style.setAttribute("data-ui-colors", "");
    document.head.appendChild(style);

    headData.script = [
      {
        innerHTML:
          "document.head.removeChild(document.querySelector('[data-ui-colors]'))",
      },
    ];
  }

  useHead(headData);
});
