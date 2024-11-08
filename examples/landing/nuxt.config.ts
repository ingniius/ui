export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  srcDir: "./app",
  modules: ["@vee-ui/nuxt"],
  routeRules: {
    "/": { prerender: true },
  },
  compatibilityDate: "2024-08-19",
  future: {
    compatibilityVersion: 4,
  },
});
