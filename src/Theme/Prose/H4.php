<?php

declare(strict_types=1);

namespace Vee\Theme\Prose;

final class H4
{
    /**
     * @return array{
     *     slots: array<string, string>,
     * }
     */
    public static function config(): array
    {
        return [
            'slots' => [
                'root' => 'text-lg text-highlighted font-bold mt-6 mb-2 scroll-mt-[calc(24px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(24px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary',
                'link' => '',
            ],
        ];
    }
}
