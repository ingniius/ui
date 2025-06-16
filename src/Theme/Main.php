<?php

declare(strict_types=1);

namespace Vee\Theme;

final class Main
{
    /**
     * @return array{
     *     base: string,
     *     variants: array<string, array<string, string>>,
     *     defaultVariants: array<string, string|bool>
     * }
     */
    public static function theme(): array
    {
        return [
            'base' => 'min-h-[calc(100vh-var(--ui-header-height))] [[data-ui-container]_&]:px-0 p-6 lg:p-8',
            'variants' => [
                'container' => [
                    'true' => 'mx-auto w-full max-w-(--ui-container)',
                ],
            ],
            'defaultVariants' => [
                'container' => false,
            ],
        ];
    }
}
