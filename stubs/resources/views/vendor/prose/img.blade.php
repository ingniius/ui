@props([
    'src' => null,
    'alt' => null,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Prose::img(), ...uComponent('prose.img')])();
    $refinedSrc = Vee\UI::refinePath($src);
@endphp

<img :src="$refinedSrc" :$alt {{ $attributes->class($self->root()) }} />
