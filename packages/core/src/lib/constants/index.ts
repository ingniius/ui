import * as icon from "../../theme/icon";
import * as preset from "../../theme/preset";

/* -------------------------------------------------------------------------- */
/* defaults                                                                   */
/* -------------------------------------------------------------------------- */

export const DEFAULT_FEATURES = {
  colorMode: true,
  fonts: true,
  image: true,
  locale: true,
};

export const DEFAULT_ROUTER = {
  inertia: "inertia",
  kit: null,
  next: null,
  nuxt: null,
  router: true,
  tanstack: "tanstack",
  vite: false,
} as const;

export const DEFAULT_OUTPUT = {
  inertia: "generated",
  kit: ".svelte-kit",
  next: ".next",
  nuxt: ".nuxt",
  router: "generated",
  tanstack: ".tanstack",
  vite: "generated",
} as const;

/* -------------------------------------------------------------------------- */
/* framework                                                                  */
/* -------------------------------------------------------------------------- */

export const COMMON_ADAPTERS = ["inertia", "router", "vite"] as const;

export const CUSTOM_ADAPTERS = {
  react: ["next", "tanstack"],
  solid: ["tanstack"],
  svelte: ["kit"],
  vue: ["nuxt", "tanstack"],
} as const;

/* -------------------------------------------------------------------------- */
/* colors                                                                     */
/* -------------------------------------------------------------------------- */

export const PRIMARY_COLOR = "primary";

export const DEFAULT_COLORS = [
  PRIMARY_COLOR,
  "secondary",
  "success",
  "info",
  "warning",
  "error",
];

export const COLOR_SHADES = [
  50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

/* -------------------------------------------------------------------------- */
/* theme                                                                      */
/* -------------------------------------------------------------------------- */

export const ICONSET_MAP = {
  "heroicons-outline": icon.heroicons_outline,
  "heroicons-solid": icon.heroicons_solid,
  hugeicons: icon.hugeicons,
  lucide: icon.lucide,
  phosphor: icon.phosphor,
  tabler: icon.tabler,
} as const;

export const PRESET_MAP = {
  lyra: preset.lyra,
  maia: preset.maia,
  mira: preset.mira,
  nova: preset.nova,
  vega: preset.vega,
} as const;

/* -------------------------------------------------------------------------- */
/* core                                                                       */
/* -------------------------------------------------------------------------- */

export const CORE_KEY = "@veehance/core";

export const CORE_PACKAGES = [
  "defu",
  "es-toolkit",
  "scule",
  "tailwind-variants",
  "zod",
];

/* -------------------------------------------------------------------------- */
/* react                                                                      */
/* -------------------------------------------------------------------------- */

export const REACT_PKG = "@veehance/react";

export const REACT_PACKAGES = ["@base-ui/react"];

export const REACT_INERTIA_PACKAGES = ["@inertiajs/react"];

export const REACT_NEXT_PACKAGES = ["next", "next-themes"];

export const REACT_ROUTER_PACKAGES = ["next-themes", "react-router"];

export const REACT_TANSTACK_PACKAGES = ["@tanstack/react-router"];

export const REACT_VITE_PACKAGES = [];

/* -------------------------------------------------------------------------- */
/* solid                                                                      */
/* -------------------------------------------------------------------------- */

export const SOLID_PKG = "@veehance/solid";

export const SOLID_PACKAGES = ["solid-iconify"];

export const SOLID_INERTIA_PACKAGES = ["inertia-adapter-solid"];

export const SOLID_ROUTER_PACKAGES = ["@solidjs/router"];

export const SOLID_TANSTACK_PACKAGES = ["@tanstack/solid-router"];

export const SOLID_VITE_PACKAGES = [];

/* -------------------------------------------------------------------------- */
/* svelte                                                                     */
/* -------------------------------------------------------------------------- */

export const SVELTE_PKG = "@veehance/svelte";

export const SVELTE_PACKAGES = ["bits-ui"];

export const SVELTE_INERTIA_PACKAGES = ["@inertiajs/svelte"];

export const SVELTE_KIT_PACKAGES = [];

export const SVELTE_ROUTER_PACKAGES = ["sv-router"];

export const SVELTE_VITE_PACKAGES = ["mode-watcher"];

/* -------------------------------------------------------------------------- */
/* vue                                                                        */
/* -------------------------------------------------------------------------- */

export const VUE_PKG = "@veehance/vue";

export const VUE_PACKAGES = ["@vueuse/core", "reka-ui"];

export const VUE_INERTIA_PACKAGES = ["@inertiajs/vue3"];

export const VUE_NUXT_PACKAGES = [
  "@nuxt/fonts",
  "@nuxt/image",
  "@nuxtjs/color-mode",
];

export const VUE_ROUTER_PACKAGES = ["vue-router"];

export const VUE_TANSTACK_PACKAGES = ["@tanstack/vue-router"];

export const VUE_VITE_PACKAGES = [
  "@unhead/vue",
  "@unhead/vue/client",
  "hookable",
];
