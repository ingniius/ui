<?php

declare(strict_types=1);

namespace Vee\Theme;

final class Link
{
    /**
     * @return array{
     *     base: list<string>,
     *     variants: array<string, array<string, string>>,
     *     compoundVariants?: array<array{
     *         color?: list<string>,
     *         variant?: list<string>,
     *         class: string
     *     }>,
     *     defaultVariants: array<string, string|bool> // Corrected: 'disabled' is bool, others are string
     * }
     */
    public static function theme(): array
    {
        return [
            'base' => ['inline font-medium underline-offset-[6px] hover:decoration-current', useTransitions() ? 'transition-colors' : ''],
            'variants' => [
                'disabled' => [
                    'true' => 'cursor-not-allowed opacity-75',
                ],
                'color' => [
                    'primary' => 'text-primary decoration-[--alpha(var(--color-primary) / 50%)]',
                    'secondary' => 'text-secondary decoration-[--alpha(var(--color-secondary) / 50%)]',
                    'success' => 'text-success decoration-[--alpha(var(--color-success) / 50%)]',
                    'info' => 'text-info decoration-[--alpha(var(--color-info) / 50%)]',
                    'warning' => 'text-warning decoration-[--alpha(var(--color-warning) / 50%)]',
                    'error' => 'text-error decoration-[--alpha(var(--color-error) / 50%)]',
                    'neutral' => 'text-default decoration-default/20',
                ],
                'variant' => [
                    'solid' => 'underline',
                    'ghost' => 'no-underline hover:underline',
                    'subtle' => 'no-underline',
                ],
            ],
            'compoundVariants' => [
                [
                    'color' => ['primary'],
                    'variant' => ['subtle'],
                    'class' => 'text-primary/70 hover:text-primary',
                ],
                [
                    'color' => ['secondary'],
                    'variant' => ['subtle'],
                    'class' => 'text-secondary/70 hover:text-secondary',
                ],
                [
                    'color' => ['success'],
                    'variant' => ['subtle'],
                    'class' => 'text-success/70 hover:text-success',
                ],
                [
                    'color' => ['info'],
                    'variant' => ['subtle'],
                    'class' => 'text-info/70 hover:text-info',
                ],
                [
                    'color' => ['warning'],
                    'variant' => ['subtle'],
                    'class' => 'text-warning/70 hover:text-warning',
                ],
                [
                    'color' => ['error'],
                    'variant' => ['subtle'],
                    'class' => 'text-error/70 hover:text-error',
                ],
                [
                    'color' => ['neutral'],
                    'variant' => ['subtle'],
                    'class' => 'text-muted hover:text-default',
                ],
            ],
            'defaultVariants' => [
                'disabled' => false,
                'color' => 'neutral',
                'variant' => 'ghost',
            ],
        ];
    }
}
