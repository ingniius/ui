<?php

declare(strict_types=1);

namespace Vee\Theme\Prose;

final class H1
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
                'root' => 'text-4xl text-highlighted font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height)',
                'link' => 'inline-flex items-center gap-2',
            ],
        ];
    }
}
