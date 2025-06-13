<?php

declare(strict_types=1);

use Vee\ClassBuilder;

it('should automatically resolves class conflicts with `__toString()`', function (): void {
    $builder = new ClassBuilder;

    $result = $builder->add('block pl-4')->add('inline px-6')->__toString();

    expect($result)->toBe('inline px-6');
});
