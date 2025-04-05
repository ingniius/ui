export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: "./app",
  modules: ["@nuxt/eslint", "@nuxt/image", "@iueev/ui"],
  css: ["~/assets/css/main.css"],
  eslint: { config: { standalone: false } },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2025-03-10",
});
