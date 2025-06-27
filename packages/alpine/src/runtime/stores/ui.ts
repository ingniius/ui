export function createUI() {
    const ui = {
        appearance: localStorage.getItem('ui.appearance') ?? 'system',
        systemAppearanceChanged: 1,

        get dark(): boolean {
            JSON.stringify(ui.systemAppearanceChanged);

            if (ui.appearance === 'system')
                return window.matchMedia('(prefers-color-scheme: dark)').matches;

            return ui.appearance === 'dark';
        },

        set dark(value: boolean) {
            const current = ui.dark;

            if (value === current)
                return;

            ui.appearance = value ? 'dark' : 'light';
        },

        applyAppearance(): void {
            const applyDark = () => document.documentElement.classList.add('dark');
            const applyLight = () => document.documentElement.classList.remove('dark');

            if (ui.appearance === 'system') {
                localStorage.removeItem('ui.appearance');
                window.matchMedia('(prefers-color-scheme: dark)').matches ? applyDark() : applyLight();
            } else {
                localStorage.setItem('ui.appearance', ui.appearance);
                ui.appearance === 'dark' ? applyDark() : applyLight();
            }
        },
    };

    return ui;
}
