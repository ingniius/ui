<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Facade;

/**
 * @see UIManager
 */
final class UI extends Facade
{
    public static function getFacadeAccessor(): string
    {
        return useUI();
    }
}
