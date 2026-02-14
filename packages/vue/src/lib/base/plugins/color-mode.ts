import { THEME_KEY } from "@veehance/core/constants";

import { useDark } from "@vueuse/core";
import type { Plugin } from "vue";

export default {
  install() {
    useDark({
      attribute: "data-theme",
      valueDark: "dark",
      valueLight: "light",
      storageKey: THEME_KEY,
    });
  },
} satisfies Plugin;
