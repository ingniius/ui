import iueev from '@iueev/eslint/vue';

import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(iueev([{ ignores: ['**/.nuxt/', '**/dist/'] }]));
