export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/image', './src/module'],
    eslint: { config: { standalone: false } },
});
