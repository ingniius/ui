import baseConfig from "./base.mjs";

/** @type {import("prettier").Config} */
export default {
  ...baseConfig,
  importOrder: [
    "^@turbo|^vitest",
    "^@vue/test-utils|^vite|^vue|^node:",
    "^@nuxt/(.*)$|^@nuxt|^@nuxtjs/(.*)$|^@nuxtjs|^nuxt/(.*)$|^nuxt",
    "^#app|^#build|^#components|^#imports|^#ui|^#vue-router",
    "^@iueev/(.*)$",
    "^@iconify|^@vue|^reka-ui|^tailwind",
    "^defu|^es-toolkit|^scule|^zod",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$|^~/(.*)$",
    "^[./]",
  ],
};
