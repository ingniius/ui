import colors from 'tailwindcss/colors';

import type { ModuleOptions } from './module';

export function normalizeColors(options: ModuleOptions) {
    return `@source './ui';

@source '../node_modules/@iueev/vue/dist/runtime/components/**/*.{js,mjs,ts,vue}';

@theme default inline {
    ${[...(options.colors || []).filter(color => !colors[color as keyof typeof colors]), 'neutral'].map(color => [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(shade => `--color-${color}-${shade}: var(--ui-color-${color}-${shade});`).join('\n\t')).join('\n\t')}
    ${options.colors?.map(color => `--color-${color}: var(--ui-${color});`).join('\n\t')}

    --text-color-dimmed: var(--ui-text-dimmed);
    --text-color-muted: var(--ui-text-muted);
    --text-color-toned: var(--ui-text-toned);
    --text-color-default: var(--ui-text);
    --text-color-highlighted: var(--ui-text-highlighted);
    --text-color-inverted: var(--ui-text-inverted);

    --background-color-default: var(--ui-bg);
    --background-color-muted: var(--ui-bg-muted);
    --background-color-elevated: var(--ui-bg-elevated);
    --background-color-accented: var(--ui-bg-accented);
    --background-color-inverted: var(--ui-bg-inverted);
    --background-color-border: var(--ui-border);

    --border-color-default: var(--ui-border);
    --border-color-muted: var(--ui-border-muted);
    --border-color-accented: var(--ui-border-accented);
    --border-color-inverted: var(--ui-border-inverted);
    --border-color-bg: var(--ui-bg);

    --ring-color-default: var(--ui-border);
    --ring-color-muted: var(--ui-border-muted);
    --ring-color-accented: var(--ui-border-accented);
    --ring-color-inverted: var(--ui-border-inverted);
    --ring-color-bg: var(--ui-bg);

    --ring-offset-color-default: var(--ui-border);
    --ring-offset-color-muted: var(--ui-border-muted);
    --ring-offset-color-accented: var(--ui-border-accented);
    --ring-offset-color-inverted: var(--ui-border-inverted);
    --ring-offset-color-bg: var(--ui-bg);

    --divide-color-default: var(--ui-border);
    --divide-color-muted: var(--ui-border-muted);
    --divide-color-accented: var(--ui-border-accented);
    --divide-color-inverted: var(--ui-border-inverted);
    --divide-color-bg: var(--ui-bg);

    --outline-color-default: var(--ui-border);
    --outline-color-inverted: var(--ui-border-inverted);

    --stroke-default: var(--ui-border);
    --stroke-inverted: var(--ui-border-inverted);

    --fill-default: var(--ui-border);
    --fill-inverted: var(--ui-border-inverted);

    --radius-xs: calc(var(--ui-radius) * 0.5);
    --radius-sm: var(--ui-radius);
    --radius-md: calc(var(--ui-radius) * 1.5);
    --radius-lg: calc(var(--ui-radius) * 2);
    --radius-xl: calc(var(--ui-radius) * 3);
    --radius-2xl: calc(var(--ui-radius) * 4);
    --radius-3xl: calc(var(--ui-radius) * 6);

    --container-8xl: 90rem;
}`;
}
