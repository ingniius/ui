<?php

declare(strict_types=1);

namespace Vee\Theme\UI;

final class Avatar
{
    /**
     * @return array{
     *     slots: array<string, string>,
     *     variants: array<string, array<string, string>>,
     *     defaultVariants: array<string, string>
     * }
     */
    public static function config(): array
    {
        return [
            'slots' => [
                'root' => 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden align-middle bg-elevated',
                'image' => 'h-full w-full rounded-[inherit] object-cover',
                'icon' => 'text-muted shrink-0',
                'fallback' => 'font-medium leading-none text-muted truncate',
            ],
            'variants' => [
                'rounded' => [
                    'none' => 'rounded-none',
                    'xs' => 'rounded-xs',
                    'sm' => 'rounded-sm',
                    'md' => 'rounded-md',
                    'lg' => 'rounded-lg',
                    'xl' => 'rounded-xl',
                    '2xl' => 'rounded-2xl',
                    '3xl' => 'rounded-3xl',
                    '4xl' => 'rounded-4xl',
                    'full' => 'rounded-full',
                ],
                'size' => [
                    '3xs' => 'size-4 text-[8px]',
                    '2xs' => 'size-5 text-[10px]',
                    'xs' => 'size-6 text-xs',
                    'sm' => 'size-7 text-sm',
                    'md' => 'size-8 text-base',
                    'lg' => 'size-9 text-lg',
                    'xl' => 'size-10 text-xl',
                    '2xl' => 'size-11 text-[22px]',
                    '3xl' => 'size-12 text-2xl',
                ],
            ],
            'defaultVariants' => [
                'rounded' => 'full',
                'size' => 'md',
            ],
        ];
    }
}
