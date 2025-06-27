@props([
    'icon' => null,
    'name' => null,
    'variant' => null,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI::icon(), ...uComponent('icon')])(['variant' => $variant]);

    $iconify = null;
    if ($name) {
        $iconify = $name;
    } elseif ($icon) {
        if (str_contains($icon, ':')) {
            $iconify = $icon;
        } else {
            $defaultIconset = Config::get('ui.iconset', 'solid');
            $iconSet = uIcon($icon);
            $iconify = $iconSet[$variant ?? $defaultIconset] ?? ($iconSet[$defaultIconset] ?? $icon);
        }
    }
@endphp

<x-icon :name="$iconify" {{ $attributes->class($self->root()) }} />
