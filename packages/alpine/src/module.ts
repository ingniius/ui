import type { Alpine } from 'alpinejs';

import { createUI } from './runtime/stores/ui';
import { isColorMode } from './runtime/utils/color-mode';

export default (Alpine: Alpine) => {
    const ui = createUI();

    window.UI = ui;
    Alpine.magic('ui', () => ui);

    if (isColorMode()) {
        Alpine.effect(() => ui.applyAppearance());

        document.addEventListener('livewire:navigated', () => {
            ui.applyAppearance();
        });

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener('change', () => {
            ui.systemAppearanceChanged++;
            ui.applyAppearance();
        });
    }
};
