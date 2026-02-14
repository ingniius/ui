import * as iconset from "../../theme/icon";
import * as preset from "../../theme/preset";

/* -------------------------------------------------------------------------- */
/* defaults                                                                   */
/* -------------------------------------------------------------------------- */

export const DEFAULT_OUTPUT = "generated";
export const DEFAULT_PREFIX = "U";

export const DEFAULT_FEATURES = {
  colorMode: true,
  fonts: true,
  image: true,
  locale: true,
};

export const DEFAULT_BASE_COLOR = "zinc" as const;
export const DEFAULT_STRATEGY = "merge" as const;

export const DEFAULT_CSS = {
  baseColor: DEFAULT_BASE_COLOR,
  strategy: DEFAULT_STRATEGY,
  prefix: "",
  plugins: [],
  sources: ["./app.config.{mjs,ts}", "./theme"],
  variables: true,
};

export const DEFAULT_THEME = {
  defaultVariants: { color: "primary" as const, size: "md" as const },
  colors: undefined,
  iconset: "lucide" as const,
  preset: "vega" as const,
  transitions: true,
};

export const DEFAULT_OPTIONS = {
  output: DEFAULT_OUTPUT,
  prefix: DEFAULT_PREFIX,
  ...DEFAULT_FEATURES,
  router: false,
  css: DEFAULT_CSS,
  theme: DEFAULT_THEME,
};

export const DEFAULT_ROUTER = {
  inertia: "inertia" as const,
  next: null,
  nuxt: null,
  router: true,
  tanstack: "tanstack" as const,
  vite: false,
};

/* -------------------------------------------------------------------------- */
/* framework                                                                  */
/* -------------------------------------------------------------------------- */

export const COMMON_ADAPTERS = ["inertia", "router", "vite"] as const;

export const CUSTOM_ADAPTERS = {
  react: ["next", "tanstack"],
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
  "heroicons-outline": iconset.heroicons_outline,
  "heroicons-solid": iconset.heroicons_solid,
  hugeicons: iconset.hugeicons,
  lucide: iconset.lucide,
  phosphor: iconset.phosphor,
  tabler: iconset.tabler,
};

export const PRESET_MAP = {
  lyra: preset.lyra,
  maia: preset.maia,
  mira: preset.mira,
  nova: preset.nova,
  vega: preset.vega,
};

/* -------------------------------------------------------------------------- */
/* core                                                                       */
/* -------------------------------------------------------------------------- */

export const CORE_KEY = "@veehance/core";

export const CORE_PACKAGES = [
  "@iconify/utils",
  "defu",
  "radash",
  "scule",
  "tailwind-variants",
  "tailwindcss/colors",
  "zod",
];

export const CORE_PLUGINS = ["@tailwindcss/vite", "vite-plugin-webfont-dl"];

/* -------------------------------------------------------------------------- */
/* react                                                                      */
/* -------------------------------------------------------------------------- */

export const REACT_KEY = "@veehance/react";

export const REACT_PACKAGES = ["@base-ui/react", "@iconify/react"];

export const REACT_INERTIA_PACKAGES = ["@inertiajs/react"];

export const REACT_ROUTER_PACKAGES = ["next-themes"];

export const REACT_TANSTACK_PACKAGES = [];

export const REACT_VITE_PACKAGES = ["@unhead/react", "@unhead/react/client"];

/* -------------------------------------------------------------------------- */
/* vue                                                                        */
/* -------------------------------------------------------------------------- */

export const VUE_KEY = "@veehance/vue";

export const VUE_PACKAGES = ["@iconify/vue", "@vueuse/core", "reka-ui"];

export const VUE_INERTIA_PACKAGES = ["@inertiajs/vue3"];

export const VUE_ROUTER_PACKAGES = [];

export const VUE_TANSTACK_PACKAGES = [];

export const VUE_VITE_PACKAGES = [
  "@unhead/vue",
  "@unhead/vue/client",
  "hookable",
];

/* -------------------------------------------------------------------------- */
/* shared                                                                     */
/* -------------------------------------------------------------------------- */

export const THEME_KEY = "ui-theme";

export const COLOR_KEY = "ui-color";
