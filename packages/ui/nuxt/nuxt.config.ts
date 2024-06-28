export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  modules: ["@nuxt/test-utils/module", "./src/module"],
});
