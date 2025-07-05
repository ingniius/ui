<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Config;

if (! function_exists(function: 'uKey')) {
    function uKey(): string
    {
        return 'ui';
    }
}

if (! function_exists('uPrefix')) {
    /**
     * Get the configured `ui.prefix`, with a fallback to 'vee'.
     */
    function uPrefix(): string
    {
        return (string) Config::get('ui.prefix', 'vee');
    }
}

if (! function_exists('uIcon')) {
    /**
     * Retrieves the set of a specific Icon from `ui.theme.icons`.
     *
     * @param  string|null  $icon
     * @param  string|null  $name
     * @param  string|null  $variant
     * @return string
     */
    function uIcon(string|null $icon, string|null $name, string|null $variant = 'solid'): string
    {
        if ($name) {
            return $name;
        } elseif ($icon) {
            if (str_contains($icon, ':')) {
                return $icon;
            } else {
                $iconset = config("ui.icons.{$icon}", []);
                return $iconset[$variant] ?? ($iconset[uIconset()] ?? $icon);
            }
        }

        return '';
    }
}

if (! function_exists('uIconset')) {
    /**
     * Get the configured `ui.iconset`, with a fallback to 'solid'.
     */
    function uIconset(): string
    {
        return (string) Config::get('ui.iconset', 'solid');
    }
}

if (! function_exists('uComponent')) {
    /**
     * Retrieves the configuration for a specific UI component from `ui.components`.
     *
     * @param  string  $key  The key of the component to retrieve (e.g., 'card', 'button').
     * @return array<string, mixed> The component's configuration array, or an empty array fallback.
     */
    function uComponent(string $key): array
    {
        return (array) Config::get("ui.components.{$key}", []);
    }
}

if (! function_exists('uTransitions')) {
    /**
     * Get the configured `ui.transitions`, with a fallback to 'true'.
     */
    function uTransitions(): bool
    {
        return (bool) Config::get('ui.transitions', true);
    }
}
