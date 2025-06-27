<?php

declare(strict_types=1);

namespace Vee\Theme;

final class UI
{
    /**
     * @return array{
     *     slots: array<string, string>,
     *     variants: array<string, array<string, string>>,
     *     defaultVariants: array<string, string>
     * }
     */
    public static function avatar(): array
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

    /**
     * @return array{
     *     slots: array<string, string|list<string>>,
     *     variants: array<string, array<string|bool, string|array<string, string>>>,
     *     compoundVariants?: array<array{
     *         color?: list<string>,
     *         variant?: list<string>,
     *         size?: list<string>,
     *         square?: bool|string,
     *         leading?: bool|string,
     *         trailing?: bool|string,
     *         loading?: bool|string,
     *         class: string|array<string, string>
     *     }>,
     *     defaultVariants: array<string, string|bool>
     * }
     */
    public static function button(): array
    {
        return [
            'slots' => [
                'root' => ['rounded-md font-medium inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75', uTransitions() ? 'transition-colors' : ''],
                'label' => 'truncate',
                'leadingIcon' => 'shrink-0',
                'leadingAvatar' => 'shrink-0',
                'leadingAvatarSize' => '',
                'trailingIcon' => 'shrink-0',
            ],
            'variants' => [
                'color' => [
                    'primary' => '',
                    'secondary' => '',
                    'success' => '',
                    'info' => '',
                    'warning' => '',
                    'error' => '',
                    'neutral' => '',
                ],
                'variant' => [
                    'solid' => '',
                    'outline' => '',
                    'soft' => '',
                    'subtle' => '',
                    'ghost' => '',
                    'link' => '',
                ],
                'size' => [
                    'xs' => [
                        'root' => 'px-2 py-1 text-xs gap-1',
                        'leadingIcon' => 'size-4',
                        'leadingAvatarSize' => '3xs',
                        'trailingIcon' => 'size-4',
                    ],
                    'sm' => [
                        'root' => 'px-2.5 py-1.5 text-xs gap-1.5',
                        'leadingIcon' => 'size-4',
                        'leadingAvatarSize' => '3xs',
                        'trailingIcon' => 'size-4',
                    ],
                    'md' => [
                        'root' => 'px-2.5 py-1.5 text-sm gap-1.5',
                        'leadingIcon' => 'size-5',
                        'leadingAvatarSize' => '2xs',
                        'trailingIcon' => 'size-5',
                    ],
                    'lg' => [
                        'root' => 'px-3 py-2 text-sm gap-2',
                        'leadingIcon' => 'size-5',
                        'leadingAvatarSize' => '2xs',
                        'trailingIcon' => 'size-5',
                    ],
                    'xl' => [
                        'root' => 'px-3 py-2 text-base gap-2',
                        'leadingIcon' => 'size-6',
                        'leadingAvatarSize' => 'xs',
                        'trailingIcon' => 'size-6',
                    ],
                ],
                'square' => [
                    'true' => '',
                ],
                'leading' => [
                    'true' => '',
                ],
                'trailing' => [
                    'true' => '',
                ],
                'loading' => [
                    'true' => '',
                ],

            ],
            'compoundVariants' => [
                [
                    'color' => ['primary'],
                    'variant' => ['solid'],
                    'class' => 'text-inverted bg-primary hover:bg-primary/75 disabled:bg-primary aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                ],
                [
                    'color' => ['secondary'],
                    'variant' => ['solid'],
                    'class' => 'text-inverted bg-secondary hover:bg-secondary/75 disabled:bg-secondary aria-disabled:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary',
                ],
                [
                    'color' => ['success'],
                    'variant' => ['solid'],
                    'class' => 'text-inverted bg-success hover:bg-success/75 disabled:bg-success aria-disabled:bg-success focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-success',
                ],
                [
                    'color' => ['info'],
                    'variant' => ['solid'],
                    'class' => 'text-inverted bg-info hover:bg-info/75 disabled:bg-info aria-disabled:bg-info focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-info',
                ],
                [
                    'color' => ['warning'],
                    'variant' => ['solid'],
                    'class' => 'text-inverted bg-warning hover:bg-warning/75 disabled:bg-warning aria-disabled:bg-warning focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-warning',
                ],
                [
                    'color' => ['error'],
                    'variant' => ['solid'],
                    'class' => 'text-inverted bg-error hover:bg-error/75 disabled:bg-error aria-disabled:bg-error focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-error',
                ],
                [
                    'color' => ['neutral'],
                    'variant' => ['solid'],
                    'class' => 'text-inverted bg-inverted hover:bg-inverted/90 disabled:bg-inverted aria-disabled:bg-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted',
                ],
                [
                    'color' => ['primary'],
                    'variant' => ['outline'],
                    'class' => 'ring ring-inset ring-primary/50 text-primary hover:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                ],
                [
                    'color' => ['secondary'],
                    'variant' => ['outline'],
                    'class' => 'ring ring-inset ring-secodary/50 text-secodary hover:bg-secodary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-secodary',
                ],
                [
                    'color' => ['success'],
                    'variant' => ['outline'],
                    'class' => 'ring ring-inset ring-success/50 text-success hover:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-success',
                ],
                [
                    'color' => ['info'],
                    'variant' => ['outline'],
                    'class' => 'ring ring-inset ring-info/50 text-info hover:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-info',
                ],
                [
                    'color' => ['warning'],
                    'variant' => ['outline'],
                    'class' => 'ring ring-inset ring-warning/50 text-warning hover:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-warning',
                ],
                [
                    'color' => ['error'],
                    'variant' => ['outline'],
                    'class' => 'ring ring-inset ring-error/50 text-error hover:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-error',
                ],
                [
                    'color' => ['neutral'],
                    'variant' => ['outline'],
                    'class' => 'ring ring-inset ring-accented text-default bg-default hover:bg-elevated disabled:bg-default aria-disabled:bg-default focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted',
                ],
                [
                    'color' => ['primary'],
                    'variant' => ['soft'],
                    'class' => 'text-primary bg-primary/10 hover:bg-primary/15 focus:outline-none focus-visible:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10',
                ],
                [
                    'color' => ['secondary'],
                    'variant' => ['soft'],
                    'class' => 'text-secondary bg-secondary/10 hover:bg-secondary/15 focus:outline-none focus-visible:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10',
                ],
                [
                    'color' => ['success'],
                    'variant' => ['soft'],
                    'class' => 'text-success bg-success/10 hover:bg-success/15 focus:outline-none focus-visible:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10',
                ],
                [
                    'color' => ['info'],
                    'variant' => ['soft'],
                    'class' => 'text-info bg-info/10 hover:bg-info/15 focus:outline-none focus-visible:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10',
                ],
                [
                    'color' => ['warning'],
                    'variant' => ['soft'],
                    'class' => 'text-warning bg-warning/10 hover:bg-warning/15 focus:outline-none focus-visible:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10',
                ],
                [
                    'color' => ['error'],
                    'variant' => ['soft'],
                    'class' => 'text-error bg-error/10 hover:bg-error/15 focus:outline-none focus-visible:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10',
                ],
                [
                    'color' => ['neutral'],
                    'variant' => ['soft'],
                    'class' => 'text-default bg-elevated hover:bg-accented/75 focus:outline-none focus-visible:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated',
                ],
                [
                    'color' => ['primary'],
                    'variant' => ['subtle'],
                    'class' => 'text-primary ring ring-inset ring-primary/25 bg-primary/10 hover:bg-primary/15 disabled:bg-primary/10 aria-disabled:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                ],
                [
                    'color' => ['secondary'],
                    'variant' => ['subtle'],
                    'class' => 'text-secondary ring ring-inset ring-secondary/25 bg-secondary/10 hover:bg-secondary/15 disabled:bg-secondary/10 aria-disabled:bg-secondary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary',
                ],
                [
                    'color' => ['success'],
                    'variant' => ['subtle'],
                    'class' => 'text-success ring ring-inset ring-success/25 bg-success/10 hover:bg-success/15 disabled:bg-success/10 aria-disabled:bg-success/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-success',
                ],
                [
                    'color' => ['info'],
                    'variant' => ['subtle'],
                    'class' => 'text-info ring ring-inset ring-info/25 bg-info/10 hover:bg-info/15 disabled:bg-info/10 aria-disabled:bg-info/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-info',
                ],
                [
                    'color' => ['warning'],
                    'variant' => ['subtle'],
                    'class' => 'text-warning ring ring-inset ring-warning/25 bg-warning/10 hover:bg-warning/15 disabled:bg-warning/10 aria-disabled:bg-warning/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-warning',
                ],
                [
                    'color' => ['error'],
                    'variant' => ['subtle'],
                    'class' => 'text-error ring ring-inset ring-error/25 bg-error/10 hover:bg-error/15 disabled:bg-error/10 aria-disabled:bg-error/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-error',
                ],
                [
                    'color' => ['neutral'],
                    'variant' => ['subtle'],
                    'class' => 'ring ring-inset ring-accented text-default bg-elevated hover:bg-accented/75 disabled:bg-elevated aria-disabled:bg-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-inverted',
                ],
                [
                    'color' => ['primary'],
                    'variant' => ['ghost'],
                    'class' => 'text-primary hover:bg-primary/10 focus:outline-none focus-visible:bg-primary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
                ],
                [
                    'color' => ['secondary'],
                    'variant' => ['ghost'],
                    'class' => 'text-secondary hover:bg-secondary/10 focus:outline-none focus-visible:bg-secondary/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
                ],
                [
                    'color' => ['success'],
                    'variant' => ['ghost'],
                    'class' => 'text-success hover:bg-success/10 focus:outline-none focus-visible:bg-success/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
                ],
                [
                    'color' => ['info'],
                    'variant' => ['ghost'],
                    'class' => 'text-info hover:bg-info/10 focus:outline-none focus-visible:bg-info/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
                ],
                [
                    'color' => ['warning'],
                    'variant' => ['ghost'],
                    'class' => 'text-warning hover:bg-warning/10 focus:outline-none focus-visible:bg-warning/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
                ],
                [
                    'color' => ['error'],
                    'variant' => ['ghost'],
                    'class' => 'text-error hover:bg-error/10 focus:outline-none focus-visible:bg-error/10 disabled:bg-transparent aria-disabled:bg-transparent dark:disabled:bg-transparent dark:aria-disabled:bg-transparent',
                ],
                [
                    'color' => ['neutral'],
                    'variant' => ['ghost'],
                    'class' => 'text-default hover:bg-elevated focus:outline-none focus-visible:bg-elevated hover:disabled:bg-transparent dark:hover:disabled:bg-transparent hover:aria-disabled:bg-transparent dark:hover:aria-disabled:bg-transparent',
                ],
                [
                    'color' => ['primary'],
                    'variant' => ['link'],
                    'class' => 'text-primary hover:text-primary/75 disabled:text-primary aria-disabled:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                ],
                [
                    'color' => ['secondary'],
                    'variant' => ['link'],
                    'class' => 'text-secondary hover:text-secondary/75 disabled:text-secondary aria-disabled:text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary',
                ],
                [
                    'color' => ['success'],
                    'variant' => ['link'],
                    'class' => 'text-success hover:text-success/75 disabled:text-success aria-disabled:text-success focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success',
                ],
                [
                    'color' => ['info'],
                    'variant' => ['link'],
                    'class' => 'text-info hover:text-info/75 disabled:text-info aria-disabled:text-info focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info',
                ],
                [
                    'color' => ['warning'],
                    'variant' => ['link'],
                    'class' => 'text-warning hover:text-warning/75 disabled:text-warning aria-disabled:text-warning focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning',
                ],
                [
                    'color' => ['error'],
                    'variant' => ['link'],
                    'class' => 'text-error hover:text-error/75 disabled:text-error aria-disabled:text-error focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error',
                ],
                [
                    'color' => ['neutral'],
                    'variant' => ['link'],
                    'class' => 'text-muted hover:text-default disabled:text-muted aria-disabled:text-muted focus:outline-none focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-inverted',
                ],
                [
                    'size' => ['xs'],
                    'square' => true,
                    'class' => 'p-1.5',
                ],
                [
                    'size' => ['sm'],
                    'square' => true,
                    'class' => 'p-1.5',
                ],
                [
                    'size' => ['md'],
                    'square' => true,
                    'class' => 'p-1.5',
                ],
                [
                    'size' => ['lg'],
                    'square' => true,
                    'class' => 'p-2',
                ],
                [
                    'size' => ['xl'],
                    'square' => true,
                    'class' => 'p-2',
                ],
                [
                    'leading' => true,
                    'loading' => true,
                    'class' => [
                        'leadingIcon' => 'animate-spin',
                    ],
                ],
                [
                    'leading' => false,
                    'loading' => true,
                    'trailing' => true,
                    'class' => [
                        'trailingIcon' => 'animate-spin',
                    ],
                ],
            ],
            'defaultVariants' => [
                'color' => 'primary',
                'variant' => 'solid',
                'size' => 'md',
                'square' => false,
                'leading' => false,
                'loading' => false,
                'trailing' => false,
            ],
        ];
    }

    /**
     * @return array{
     *     slots: array<string, string>,
     *     variants: array<string, array<string, string>>,
     *     defaultVariants: array<string, string>
     * }
     */
    public static function card(): array
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

    /**
     * @return array{
     *     base: string|list<string|null>
     * }
     */
    public static function container(): array
    {
        return [
            'base' => 'mx-auto w-full max-w-(--ui-container) px-6 lg:px-8',
        ];
    }

    /**
     * @return array{
     *     base: string,
     *     variants: array<string, array<string, string>>,
     *     defaultVariants: array<string, string>
     * }
     */
    public static function icon(): array
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
                'variant' => 'solid',
            ],
        ];
    }

    /**
     * @return array{
     *     base: string,
     * }
     */
    public static function image(): array
    {
        return [
            'base' => '',
        ];
    }

    /**
     * @return array{
     *     base: list<string>,
     *     variants: array<string, array<string, string>>,
     *     compoundVariants?: array<array{
     *         color?: list<string>,
     *         variant?: list<string>,
     *         class: string
     *     }>,
     *     defaultVariants: array<string, string|bool>
     * }
     */
    public static function link(): array
    {
        return [
            'base' => ['inline font-medium underline-offset-[6px] hover:decoration-current', uTransitions() ? 'transition-colors' : ''],
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

    /**
     * @return array{
     *     base: string,
     *     variants: array<string, array<string, string>>,
     *     defaultVariants: array<string, string|bool>
     * }
     */
    public static function main(): array
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
