<?php

declare(strict_types=1);

use Vee\Utils\Cva;

it('should generate classes with variants, compound, and defaults', function () {
    $builder = new Cva(
        base: 'text-base',
        variants: [
            'color' => [
                'primary' => 'text-blue-500',
                'error' => 'text-red-500',
            ],
            'size' => [
                'sm' => 'text-sm',
                'lg' => 'text-lg',
            ],
        ],
        compoundVariants: [
            [
                'color' => ['error'],
                'size' => ['lg'],
                'class' => 'font-bold',
            ],
        ],
        defaultVariants: [
            'size' => 'sm',
        ]
    );

    $result1 = $builder->apply(['color' => 'error']);
    expect($result1)->toBe('text-red-500 text-sm');

    $result2 = $builder->apply(['color' => 'error', 'size' => 'lg']);
    expect($result2)->toBe('text-red-500 text-lg font-bold');
});
