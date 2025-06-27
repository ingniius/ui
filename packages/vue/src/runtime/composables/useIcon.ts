import type { AppConfig } from '@nuxt/schema';
import type { Iconset } from '#ui/types/icon';

import appConfig from '#build/app.config';

export interface UseIcon {
    /**
     * Display an icon from `ui.icons`.
     */
    icon?: keyof AppConfig['ui']['icons'];
    /**
     * Display an icon from Iconify.
     * @IconifyIcon
     */
    name?: string;
    /**
     * @defaultValue 'solid'
     */
    variant?: Iconset | 'mini' | 'micro';
}

export function useIcon({ icon, name, variant = 'solid' }: UseIcon) {
    if (name)
        return name;

    if (icon) {
        if (icon.includes(':'))
            return icon;

        const iconset = appConfig.ui?.icons[icon] ?? {};
        return iconset[variant as 'solid'] ?? iconset[appConfig.ui?.iconset as 'solid'] ?? icon;
    }

    return '';
}
