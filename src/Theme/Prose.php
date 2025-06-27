<?php

declare(strict_types=1);

namespace Vee\Theme;

final class Prose
{
    /**
     * @return array{
     *     slots: array<string, string>,
     * }
     */
    public static function h1(): array
    {
        return [
            'slots' => [
                'root' => 'text-4xl text-highlighted font-bold mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] lg:scroll-mt-(--ui-header-height)',
                'link' => 'inline-flex items-center gap-2',
            ],
        ];
    }

    /**
     * @return array{
     *     slots: array<string, string>,
     * }
     */
    public static function h2(): array
    {
        return [
            'slots' => [
                'root' => ['relative text-2xl text-highlighted font-bold mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(48px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-xl/7 [&>a>code]:font-bold', uTransitions() ? '[&>a>code]:transition-colors' : ''],
                'leading' => ['absolute -ms-8 top-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-elevated hover:text-primary rounded-md hidden lg:flex text-muted', uTransitions() ? 'transition' : ''],
                'leadingIcon' => 'size-4 shrink-0',
                'link' => 'group lg:ps-2 lg:-ms-2',
            ],
        ];
    }

    /**
     * @return array{
     *     slots: array<string, string>,
     * }
     */
    public static function h3(): array
    {
        return [
            'slots' => [
                'root' => ['relative text-xl text-highlighted font-bold mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(32px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary [&>a>code]:border-dashed hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a>code]:text-lg/6 [&>a>code]:font-bold', uTransitions() ? '[&>a>code]:transition-colors' : ''],
                'leading' => ['absolute -ms-8 top-0.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 p-1 bg-elevated hover:text-primary rounded-md hidden lg:flex text-muted', uTransitions() ? 'transition' : ''],
                'leadingIcon' => 'size-4 shrink-0',
                'link' => 'group lg:ps-2 lg:-ms-2',
            ],
        ];
    }

    /**
     * @return array{
     *     slots: array<string, string>,
     * }
     */
    public static function h4(): array
    {
        return [
            'slots' => [
                'root' => 'text-lg text-highlighted font-bold mt-6 mb-2 scroll-mt-[calc(24px+45px+var(--ui-header-height))] lg:scroll-mt-[calc(24px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary',
                'link' => '',
            ],
        ];
    }

    /**
     * @return array{
     *     base: string,
     * }
     */
    public static function img(): array
    {
        return [
            'base' => '',
        ];
    }
}
