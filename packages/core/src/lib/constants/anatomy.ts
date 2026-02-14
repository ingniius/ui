export const CORE_PKG_ANATOMY = {
  name: "@veehance/core",
  optimize: [],
  plugin: ["@tailwindcss/vite"],
  shared: [
    "@iconify/utils",
    "defu",
    "radash",
    "scule",
    "tailwind-variants",
    "zod",
  ],
} as const;

export const REACT_PKG_ANATOMY = {
  name: "@veehance/react",
  optimize: ["@unhead/react/client"],
  plugin: [],
  shared: ["@unhead/react"],
  vite: [],
} as const;

export const VUE_PKG_ANATOMY = {
  name: "@veehance/vue",
  optimize: ["@unhead/vue/client"],
  plugin: [],
  shared: ["@unhead/vue"],
  vite: [],
} as const;
