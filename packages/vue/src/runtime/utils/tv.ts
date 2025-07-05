import type { AppConfig } from '@nuxt/schema';
import type { defaultConfig } from 'tailwind-variants';

import appConfig from '#build/app.config';
import { createTV } from 'tailwind-variants';

const appConfigTv = appConfig as AppConfig & { ui: { tv: typeof defaultConfig } };

export const tv = /* @__PURE__ */ createTV(appConfigTv.ui?.tv);
