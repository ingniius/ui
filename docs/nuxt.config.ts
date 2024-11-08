export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV !== "production" },
  srcDir: "./app",
  app: {
    rootAttrs: {
      "vaul-drawer-wrapper": "",
      "class": "bg-[var(--ui-bg)]",
    },
  },
  modules: ["@vee-ui/nuxt", "nuxt-component-meta", "nuxt-og-image"],
  content: {
    highlight: {
      langs: ["bash", "ts", "typescript", "diff", "vue", "json", "yml", "css", "mdc"],
    },
  },
  mdc: { highlight: { noApiRoute: false } },
  routeRules: {
    "/": { redirect: "/getting-started", prerender: false },
  },
  compatibilityDate: "2024-08-19",
  future: {
    compatibilityVersion: 4,
  },
});
