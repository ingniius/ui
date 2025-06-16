<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Config;

if (! function_exists('useUI')) {
    /**
     * Get the configured `ui.prefix`, with a fallback to 'vee'.
     */
    function useUI(): string
    {
        $prefix = Config::get('ui.prefix');

        return is_string($prefix) ? $prefix : 'vee';
    }
}

if (! function_exists('useProse')) {
    function useProse(): string
    {
        return 'prose';
    }
}

if (! function_exists('useComponents')) {
    /**
     * Retrieves the configuration for a specific UI component from `ui.components`.
     *
     * @param  string  $key  The key of the component to retrieve (e.g., 'card', 'button').
     * @return array<string, mixed> The component's configuration array, or an empty array fallback.
     */
    function useComponents(string $key): array
    {
        /** @var array<string, mixed>|null $component */
        $component = Config::get("ui.components.{$key}");

        return is_array($component) ? $component : [];
    }
}

if (! function_exists('useIcons')) {
    /**
     * Retrieves the set of a specific Icon from `ui.theme.icons`.
     *
     * @param  string  $key  The key of the icon to retrieve (e.g., 'card', 'button').
     * @return array<string, mixed> The icon's array set, or an empty array fallback.
     */
    function useIcons(string $key): array
    {
        $icon = config("ui.theme.icons.{$key}");
        return is_array($icon) ? $icon : [];
    }
}

if (! function_exists('useTransitions')) {
    /**
     * Get the configured `ui.theme.transitions`, with a fallback to 'true'.
     */
    function useTransitions(): bool
    {
        return (bool) Config::get('ui.theme.transitions');
    }
}
