import type { Alpine } from 'alpinejs';

declare global {
    interface Window {
        Alpine: Alpine & {
            __vee_registered?: boolean;
        };

        TailwindConfig: {
            darkMode?: string;
        };

        UI: {
            appearance: string;
            systemAppearanceChanged: number;
            dark: boolean;
            applyAppearance: () => void;
        };
    }
}

export {};
