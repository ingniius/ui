export const COMMON_ADAPTERS = ["core", "inertia", "router"] as const;

export const CUSTOM_ADAPTERS = {
  react: ["next", "tanstack"],
  vue: ["nuxt", "tanstack"],
} as const;

export const ADAPTER_KEYS = [
  ...COMMON_ADAPTERS,
  ...CUSTOM_ADAPTERS.react,
  ...CUSTOM_ADAPTERS.vue,
] as const;

export const RUNTIME_KEYS = ["react", "vue"] as const;
