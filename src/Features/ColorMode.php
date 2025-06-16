<?php

declare(strict_types=1);

namespace Vee\Features;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Config;

final class ColorMode
{
    public static function boot(): void
    {
        $instance = new self;
        $instance->registerColorModeDirectives();
    }

    /**
     * Generates HTML for UI appearance (dark mode toggle) logic.
     *
     * @param  array<string, mixed>  $options  Options for rendering (e.g., 'nonce').
     * @return string The HTML string containing script.
     */
    public static function appearance($options = []): string
    {
        $colors = is_array(Config::get('ui.theme.colors')) ? Config::get('ui.theme.colors') : [];
        $nonce = (is_string($options['nonce'] ?? null)) ? ' nonce="'.$options['nonce'].'"' : '';

        $cssRoot = [];
        $cssLight = [];
        $cssDark = [];

        $shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
        foreach ($colors as $name => $color) {
            if (! is_string($name) || ! is_string($color)) {
                continue;
            }

            foreach ($shades as $shade) {
                $cssRoot[] = "--ui-{$name}-{$shade}: var(--color-{$color}-{$shade});";
            }

            $cssLight[] = "--ui-{$name}: var(--color-{$name}-600);";
            $cssDark[] = "--ui-{$name}: var(--color-{$name}-500);";
        }

        $cssVariables = implode(PHP_EOL.'        ', $cssRoot);
        $lightVariables = implode(PHP_EOL.'        ', $cssLight);
        $darkVariables = implode(PHP_EOL.'        ', $cssDark);

        return <<<HTML
<style$nonce>
@layer base {
    :root {
        {$cssVariables}
    }

    :root,
    .light {
        {$lightVariables}
    }

    .dark {
        {$darkVariables}
    }
}
</style>
<script$nonce>
    window.UI = {
        applyAppearance (appearance) {
            let applyDark = () => document.documentElement.classList.add('dark')
            let applyLight = () => document.documentElement.classList.remove('dark')

            if (appearance === 'system') {
                let media = window.matchMedia('(prefers-color-scheme: dark)')

                window.localStorage.removeItem('ui.appearance')

                media.matches ? applyDark() : applyLight()
            } else if (appearance === 'dark') {
                window.localStorage.setItem('ui.appearance', 'dark')

                applyDark()
            } else if (appearance === 'light') {
                window.localStorage.setItem('ui.appearance', 'light')

                applyLight()
            }
        }
    }

    window.UI.applyAppearance(window.localStorage.getItem('ui.appearance') || 'system')
</script>
HTML;
    }

    /**
     * Registers Blade directives for @uiAppearance.
     */
    public function registerColorModeDirectives(): void
    {
        $uiPrefix = useUI();

        Blade::directive('uiAppearance', fn ($expression) => <<<PHP
        {!! app('{$uiPrefix}')->appearance($expression) !!}
        PHP);
    }
}
