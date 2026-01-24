export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "./app",
  css: ["~/styles.css"],
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxtjs/color-mode",
    "@veehance/vue/nuxt",
  ],
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2026-01-13",
});
