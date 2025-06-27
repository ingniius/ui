<?php

declare(strict_types=1);

namespace Vee\Theme\UI;

final class Container
{
    /**
     * @return array{
     *     base: string|list<string|null>
     * }
     */
    public static function config(): array
    {
        return [
            'base' => 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8',
        ];
    }
}
