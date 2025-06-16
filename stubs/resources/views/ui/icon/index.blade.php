@props([
    'icon' => null,
    'name' => null,
    'variant' => null,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Icon::theme(), ...useComponents('icon')])(['variant' => $variant]);

    $iconify = null;
    if ($name) {
        $iconify = $name;
    } elseif ($icon) {
        if (str_contains($icon, ':')) {
            $iconify = $icon;
        } else {
            $iconSet = useIcons($icon);
            $iconify = $iconSet[$variant ?? 'solid'] ?? $iconSet['solid'] ?? $icon;
        }
    }
@endphp

<x-icon :name="$iconify" {{ $attributes->class($self->root()) }} />
