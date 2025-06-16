<?php

declare(strict_types=1);

use Vee\Utils\Tva;

it('should generates slot classes with variants and compound variants', function () {
    $builder = new Tva([
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
        ],
        'compoundVariants' => [
            [
                'intent' => ['error'],
                'size' => ['lg'],
                'class' => 'border border-red-400',
            ],
        ],
        'defaultVariants' => [
            'intent' => 'success',
            'size' => 'sm',
        ],
    ]);

    $result1 = $builder->apply(); // uses defaults
    expect($result1)->toBe([
        'root' => 'p-4 bg-green-100 text-green-600 text-sm',
        'icon' => 'mr-2 text-green-500 size-4',
    ]);

    $result2 = $builder->apply(['intent' => 'error', 'size' => 'lg']);
    expect($result2)->toBe([
        'root' => 'p-4 bg-red-100 text-red-600 text-lg border border-red-400',
        'icon' => 'mr-2 text-red-500 size-6',
    ]);
});
