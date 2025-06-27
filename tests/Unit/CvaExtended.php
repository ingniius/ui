<?php

declare(strict_types=1);

use Vee\Utils\CvaExtend;

it('should generates slot classes with variants and compound variants', function () {
    $builder = new CvaExtend([
        'slots' => [
            'root' => 'p-4',
            'icon' => 'mr-2',
        ],
        'variants' => [
            'intent' => [
                'error' => [
                    'root' => 'bg-red-100 text-red-600',
                    'icon' => 'text-red-500',
                ],
                'success' => [
                    'root' => 'bg-green-100 text-green-600',
                    'icon' => 'text-green-500',
                ],
            ],
            'size' => [
                'sm' => [
                    'root' => 'text-sm',
                    'icon' => 'size-4',
                ],
                'lg' => [
                    'root' => 'text-lg',
                    'icon' => 'size-6',
                ],
            ],
            'loading' => [
                'true' => [
                    'icon' => 'opacity-50',
                ],
            ],
        ],
        'compoundVariants' => [
            [
                'intent' => ['error'],
                'size' => ['lg'],
                'class' => 'border border-red-400',
            ],
            [
                'loading' => true,
                'class' => [
                    'icon' => 'animate-spin',
                ],
            ],
        ],
        'defaultVariants' => [
            'intent' => 'success',
            'size' => 'sm',
            'loading' => false,
        ],
    ]);

    // With defaults (success/sm/loading: false)
    $result1 = $builder->apply();
    expect($result1)->toBe([
        'root' => 'p-4 bg-green-100 text-green-600 text-sm',
        'icon' => 'mr-2 text-green-500 size-4',
    ]);

    // With intent=error, size=lg, loading=true
    $result2 = $builder->apply(['intent' => 'error', 'size' => 'lg', 'loading' => true]);
    expect($result2)->toBe([
        'root' => 'p-4 bg-red-100 text-red-600 text-lg border border-red-400',
        'icon' => 'mr-2 text-red-500 size-6 opacity-50 animate-spin',
    ]);
});
