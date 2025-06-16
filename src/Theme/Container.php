<?php

declare(strict_types=1);

namespace Vee\Theme;

final class Container
{
    /**
     * @return array{
     *     base: string|list<string|null>
     * }
     */
    public static function theme(): array
    {
        return [
            'base' => 'mx-auto w-full max-w-(--ui-container) px-6 lg:px-8',
        ];
    }
}
