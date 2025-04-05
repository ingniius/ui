export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/test-utils/module", "./src/module"],
  eslint: { config: { standalone: false } },
});
