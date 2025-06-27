@props([
    'src' => null,
    'alt' => null,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI\Image::config(), ...uComponent('image')])();
    $refinedSrc = Vee\UI::refinePath($src);
@endphp

<img
    src="{{ $refinedSrc }}"
    alt="{{ $alt }}"
    {{ $attributes->class($self->root()) }}
/>
