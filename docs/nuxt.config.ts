export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "./app",
  css: ["~/styles.css"],
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@veehance/vue/module",
  ],
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2025-12-28",
});
