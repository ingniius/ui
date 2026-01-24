export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "./src",
  css: ["~/styles.css"],
  modules: ["@nuxt/fonts", "@veehance/vue/nuxt"],
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2026-01-13",
});
