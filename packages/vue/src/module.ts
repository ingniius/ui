import { addImportsDir, addPlugin, addVitePlugin, createResolver, defineNuxtModule, extendViteConfig, hasNuxtModule, installModule, useNuxt } from '@nuxt/kit';
import { defu } from 'defu';

import { name, version } from '../package.json';
import { getUiConfig, resolveColors } from './defaults';
import { addTemplates } from './templates';

export interface ModuleOptions {
    prefix?: string;
    colorMode?: boolean;
    fonts?: boolean;
    image?: boolean;
    theme?: {
        colors?: string[];
        transitions?: boolean;
    };
}

export default defineNuxtModule<ModuleOptions>({
    meta: {
        name,
        version,
        configKey: 'ui',
        compatibility: {
            nuxt: '>=3.16.0',
        },
    },
    defaults: {
        prefix: 'vee',
        colorMode: true,
        fonts: true,
        image: false,
        theme: {
            colors: undefined,
            transitions: true,
        },
    },
    async setup(options, nuxt) {
        const { resolve } = createResolver(import.meta.url);

        // 0. CONFIGURATION
        options.theme = options.theme || {};
        options.theme.colors = resolveColors(options.theme.colors);

        nuxt.options.ui = options;
        nuxt.options.appConfig.ui = defu(nuxt.options.appConfig.ui || {}, getUiConfig(options.theme.colors));

        nuxt.options.app.rootAttrs = nuxt.options.app.rootAttrs || {};
        nuxt.options.app.rootAttrs.class = [nuxt.options.app.rootAttrs.class, 'isolate'].filter(Boolean).join(' ');
        nuxt.options.router.options.scrollBehaviorType = 'smooth';

        if (nuxt.options.builder === '@nuxt/vite-builder') {
            const plugin = await import('@tailwindcss/vite').then(r => r.default);
            addVitePlugin(plugin());
        } else {
            nuxt.options.postcss.plugins['@tailwindcss/postcss'] = {};
        }

        // 1. RUNTIME
        const runtimeDir = resolve('./runtime');
        nuxt.options.build.transpile.push(runtimeDir);

        nuxt.options.alias['#ui/composables'] = resolve(runtimeDir, 'composables');
        nuxt.options.alias['#ui/types'] = resolve(runtimeDir, 'types');

        // 2. MODULES
        await registerModule('@nuxt/icon', 'icon', defu(nuxt.options.icon, { cssLayer: 'components' }));

        if (hasNuxtModule('@nuxt/fonts') || options.fonts) {
            await registerModule('@nuxt/fonts', 'fonts', defu(nuxt.options.fonts, { defaults: { weights: [400, 500, 600, 700] } }));
        }

        if (hasNuxtModule('@nuxt/image') || options.image) {
            await registerModule('@nuxt/image', 'image', nuxt.options.image);
        }

        if (hasNuxtModule('@nuxtjs/color-mode') || options.colorMode) {
            await registerModule('@nuxtjs/color-mode', 'colorMode', { classSuffix: '', disableTransition: true });
        }

        // 3. COMPOSABLES
        addImportsDir(resolve(runtimeDir, 'composables'));

        // 4. PLUGINS
        addPlugin({ src: resolve(runtimeDir, 'plugins/colors') });

        // 5. TEMPLATES
        addTemplates(options, nuxt, { resolve, runtimeDir });

        // 6. OPTMIZATION
        extendViteConfig((config) => {
            config.optimizeDeps = config.optimizeDeps || {};
            config.optimizeDeps.include = config.optimizeDeps.include || [];
            config.optimizeDeps.include.push(
                '@vueuse/core',
                'es-toolkit',
                'reka-ui',
                'tailwind-variants',
                'tailwindcss/colors',
            );
        });
    },
});

async function registerModule(name: string, key: string, options?: Record<string, any>, nuxt = useNuxt()) {
    if (!hasNuxtModule(name)) {
        await installModule(name, options);
    } else {
        (nuxt.options as any)[key] = defu((nuxt.options as any)[key], options);
    }
}
