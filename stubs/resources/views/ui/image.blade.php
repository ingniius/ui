@props([
    'src' => null,
    'alt' => null,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI::image(), ...uComponent('image')])();
    $refinedSrc = Vee\UI::refinePath($src);
@endphp

<img :src="$refinedSrc" :$alt {{ $attributes->class($self->root()) }} />
