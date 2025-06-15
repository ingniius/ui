<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Config;

/**
 * @see UiManager
 */
final class Ui extends Facade
{
    public static function getFacadeAccessor()
    {
        return Config::get('ui.prefix', 'vee');
    }
}
