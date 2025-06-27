import type { UseHeadInput } from '@unhead/vue/types';

import { defineNuxtPlugin, useAppConfig, useHead, useNuxtApp } from '#imports';
import { isPlainObject } from 'es-toolkit';
import colors from 'tailwindcss/colors';
import { computed } from 'vue';

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function getColor(color: keyof typeof colors, shade: typeof shades[number]): string {
    if (color in colors && isPlainObject(colors[color]) && shade in colors[color])
        return colors[color][shade] as string;

    return '';
}

function generateShades(key: string, value: string) {
    return `${shades.map(shade => `--ui-color-${key}-${shade}: var(--color-${value === 'neutral' ? 'old-neutral' : value}-${shade}, ${getColor(value as keyof typeof colors, shade)});`).join('\n  ')}`;
}
function generateColor(key: string, shade: number) {
    return `--ui-${key}: var(--ui-color-${key}-${shade});`;
}

export default defineNuxtPlugin(() => {
    const appConfig = useAppConfig();
    const nuxtApp = useNuxtApp();

    const root = computed(() => {
        const { neutral, ...colors } = appConfig.ui.colors;

        return `@layer base {
    :root {
        ${Object.entries(appConfig.ui.colors).map(([key, value]: [string, string]) => generateShades(key, value)).join('\n  ')}
    }

    :root, .light {
        color-scheme: light;
        ${Object.keys(colors).map(key => generateColor(key, 500)).join('\n  ')}
    }

    .dark {
        color-scheme: dark;
        ${Object.keys(colors).map(key => generateColor(key, 400)).join('\n  ')}
    }
}`;
    });

    // Head
    const headData: UseHeadInput = {
        style: [{
            innerHTML: () => root.value,
            tagPriority: -2,
            id: 'ui-colors',
        }],
    };

    // SPA mode
    if (import.meta.client && nuxtApp.isHydrating && !nuxtApp.payload.serverRendered) {
        const style = document.createElement('style');

        style.innerHTML = root.value;
        style.setAttribute('data-ui-colors', '');
        document.head.appendChild(style);

        headData.script = [{
            innerHTML: 'document.head.removeChild(document.querySelector(\'[data-ui-colors]\'))',
        }];
    }

    useHead(headData);
});
