<?php

declare(strict_types=1);

namespace Vee\Theme\UI;

final class Icon
{
    /**
     * @return array{
     *     base: string,
     *     variants: array<string, array<string, string>>,
     *     defaultVariants: array<string, string>
     * }
     */
    public static function config(): array
    {
        return [
            'base' => '',
            'variants' => [
                'variant' => [
                    'solid' => 'size-6',
                    'outline' => 'size-6',
                    'mini' => 'size-5',
                    'micro' => 'size-4',
                ],
            ],
            'defaultVariants' => [
                'variant' => 'solid'
            ],
        ];
    }
}
