<?php

declare(strict_types=1);

use Vee\Features\ColorMode;

test('ColorMode outputs CSS and JS with given colors', function () {
    $html = ColorMode::appearance();

    expect($html)
        ->toContain('--ui-primary-500: var(--color-emerald-500);')
        ->toContain('--ui-neutral-700: var(--color-old-neutral-700);')
        ->toContain('<script')
        ->toContain('applyAppearance');
});
