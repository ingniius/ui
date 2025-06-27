export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/image', '@nuxtjs/mdc', './src/module'],
    eslint: { config: { standalone: false } },
});
