<?php

declare(strict_types=1);

use Vee\Utils\CvaSlot;

it('should return closures via method call', function () {
    $slot = new CvaSlot([
        'header' => fn () => 'text-lg font-bold',
    ]);

    expect($slot->header())->toBe('text-lg font-bold');
});

it('should applies override arguments', function () {
    $slot = new CvaSlot([
        'body' => fn ($override = '') => 'p-4 '.(is_array($override) ? implode(' ', $override) : $override),
    ]);

    expect($slot->body('text-red'))->toBe('p-4 text-red');
    expect($slot->body(['text-red', 'bg-blue']))->toBe('p-4 text-red bg-blue');
});

it('should returns empty string for undefined slot', function () {
    $slot = new CvaSlot([]);

    expect($slot->footer())->toBe('');
    expect($slot->footer('anything'))->toBe('');
});

it('should returns all slots with all()', function () {
    $slot = new CvaSlot([
        'root' => fn () => 'foo',
        'header' => fn () => 'bar',
    ]);

    $all = $slot->all();

    expect($all)->toBeArray()
        ->and(array_keys($all))->toContain('root', 'header')
        ->and($all['root']())->toBe('foo')
        ->and($all['header']())->toBe('bar');
});
