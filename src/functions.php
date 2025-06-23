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
