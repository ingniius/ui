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
        $colors = is_array(Config::get('ui.colors')) ? Config::get('ui.colors') : [];

        $cssRoot = [];
        $cssLight = [];
        $cssDark = [];

        $shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
        foreach ($colors as $name => $color) {
            if (! is_string($name) || ! is_string($color)) {
                continue;
            }

            $isNeutral = $name === 'neutral';
            foreach ($shades as $shade) {
                $source = $isNeutral ? 'old-neutral' : $color;
                $cssRoot[] = "--ui-{$name}-{$shade}: var(--color-{$source}-{$shade});";
            }

            if (! $isNeutral) {
                $cssLight[] = "--ui-{$name}: var(--color-{$name}-500);";
                $cssDark[] = "--ui-{$name}: var(--color-{$name}-400);";
            }
        }

        $cssVariables = implode(PHP_EOL.'        ', $cssRoot);
        $lightVariables = implode(PHP_EOL.'        ', $cssLight);
        $darkVariables = implode(PHP_EOL.'        ', $cssDark);

        $nonce = '';
        if (isset($options['nonce']) && is_string($options['nonce'])) {
            $nonce = ' nonce="'.$options['nonce'].'"';
        }

        $colorMode = Config::get('ui.colorMode', true);

        return $colorMode ? <<<HTML
<style$nonce>
@layer base {
    :root {
        {$cssVariables}
    }

    :root,
    .light {
        color-scheme: light;
        {$lightVariables}
    }

    .dark {
        color-scheme: dark;
        {$darkVariables}
    }
}
</style>
<script$nonce>
    window.TailwindConfig = window.TailwindConfig || { darkMode: 'class' };
    window.UI = window.UI || {};

    window.UI.applyAppearance = function (appearance) {
        const applyDark = () => document.documentElement.classList.add('dark');
        const applyLight = () => document.documentElement.classList.remove('dark');

        if (appearance === 'system') {
            localStorage.removeItem('ui.appearance');
            window.matchMedia('(prefers-color-scheme: dark)').matches ? applyDark() : applyLight();
        } else {
            localStorage.setItem('ui.appearance', appearance);
            appearance === 'dark' ? applyDark() : applyLight();
        }
    };

    window.UI.applyAppearance(localStorage.getItem('ui.appearance') || 'system');
</script>
HTML : <<<HTML
<style$nonce>
@layer base {
    :root {
        {$cssVariables}
    }

    :root,
    .light {
        color-scheme: light;
        {$lightVariables}
    }
}
</style>
<script$nonce>
    window.TailwindConfig = window.TailwindConfig || {};
    window.UI = window.UI || { appearance: 'light' };
</script>
HTML;
    }

    /**
     * Registers Blade directives for @uiAppearance.
     */
    public function registerColorModeDirectives(): void
    {
        $key = uKey();

        Blade::directive('uiAppearance', fn ($expression) => <<<PHP
        {!! app('{$key}')->appearance($expression) !!}
        PHP);
    }
}
