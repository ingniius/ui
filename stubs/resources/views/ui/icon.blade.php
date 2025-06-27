@props([
    'icon' => null,
    'name' => null,
    'variant' => 'solid',
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI\Icon::config(), ...uComponent('icon')])(['variant' => $variant]);

    $iconify = uIcon($icon, $name, $variant);
    $iconset = $variant === 'outline' ? 'outline' : uIconset();
@endphp

<x-icon :name="$iconify" {{ $attributes->class($self->root([$iconset === 'outline' ? 'p-[0.025rem]' : ''])) }} />
