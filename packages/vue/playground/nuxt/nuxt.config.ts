export default defineNuxtConfig({
    devtools: { enabled: true },
    srcDir: './app',
    modules: ['@nuxt/eslint', '@iueev/vue/nuxt'],
    css: ['~/assets/css/app.css'],
    eslint: { config: { standalone: false } },
    future: { compatibilityVersion: 4 },
    compatibilityDate: '2025-03-10',
});
