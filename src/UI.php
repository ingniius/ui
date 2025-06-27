<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Facade;

final class UI extends Facade
{
    public static function getFacadeAccessor(): string
    {
        return uKey();
    }
}
