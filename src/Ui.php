<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Facade;

/**
 * @see UiManager
 */
final class Ui extends Facade
{
    public static function getFacadeAccessor()
    {
        return 'vee';
    }
}
