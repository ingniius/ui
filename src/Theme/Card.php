<?php

declare(strict_types=1);

namespace Vee\Theme;

final class Card
{
    /**
     * @return array{
     *     slots: array<string, string>,
     *     variants: array<string, array<string, string>>,
     *     defaultVariants: array<string, string>
     * }
     */
    public static function theme(): array
    {
        return [
            'slots' => [
                'root' => 'rounded-lg',
                'header' => 'p-4 sm:px-6',
                'body' => 'p-4 sm:px-6',
                'footer' => 'p-4 sm:px-6',
            ],
            'variants' => [
                'variant' => [
                    'solid' => 'bg-inverted text-inverted',
                    'outline' => 'bg-default ring ring-default divide-y divide-default',
                    'soft' => 'bg-elevated/50 divide-y divide-default',
                    'subtle' => 'bg-elevated/50 ring ring-default divide-y divide-default',
                ],
            ],
            'defaultVariants' => [
                'variant' => 'outline',
            ],
        ];
    }
}
