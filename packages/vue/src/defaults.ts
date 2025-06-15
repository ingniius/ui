import { pick } from 'es-toolkit';

export function getUiConfig(colors?: string[]) {
    return {
        colors: pick({
            primary: 'indigo',
            secondary: 'violet',
            accent: 'lime',
            success: 'green',
            info: 'blue',
            warning: 'yellow',
            error: 'red',
            neutral: 'zinc',
        }, [...(colors || []), 'neutral' as any]),
        icons: {
            dark: 'lucide:moon',
            light: 'lucide:sun',
            loading: 'lucide:refresh-cw',
            system: 'lucide:monitor',
        },
    };
}

export function resolveColors(colors?: string[]) {
    return colors?.length
        ? [...new Set(['primary', ...colors])]
        : ['primary', 'secondary', 'accent', 'success', 'info', 'warning', 'error'];
}
