import { pick } from 'es-toolkit';

import icons from './theme/icons';

export function getUIConfig(colors?: string[]) {
    return {
        colors: pick({
            primary: 'purple',
            secondary: 'lime',
            success: 'green',
            info: 'blue',
            warning: 'yellow',
            error: 'red',
            neutral: 'zinc',
        }, [...(colors || []), 'neutral' as any]),
        icons,
        iconset: 'solid',
    };
}

export function resolveColors(colors?: string[]) {
    return colors?.length
        ? [...new Set(['primary', ...colors])]
        : ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
}
