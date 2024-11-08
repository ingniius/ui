import { createConfigForNuxt } from "@nuxt/eslint-config/flat";

import vueConfig from "@vee-ui/eslint/vue";

/** @type {Awaited<import('typescript-eslint').Config>} */
export default createConfigForNuxt({
  features: {
    tooling: true,
  },
}).append([{ ignores: ["dist/**", ".nuxt/**"] }, ...vueConfig]);
