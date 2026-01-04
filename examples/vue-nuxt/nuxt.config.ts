export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "./src",
  css: ["~/styles.css"],
  modules: ["@veehance/vue/nuxt"],
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2025-12-28",
});
