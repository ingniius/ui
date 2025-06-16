<?php

declare(strict_types=1);

namespace Vee\Theme;

final class Avatar
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
                'root' => 'inline-flex items-center justify-center shrink-0 select-none overflow-hidden rounded-full align-middle bg-elevated',
                'image' => 'h-full w-full rounded-[inherit] object-cover',
                'icon' => 'text-muted shrink-0',
                'fallback' => 'font-medium leading-none text-muted truncate',
            ],
            'variants' => [
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
                'size' => 'md',
            ],
        ];
    }
}
