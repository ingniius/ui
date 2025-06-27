@props([
    'light' => null,
    'dark' => null,
    'alt' => null,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\ColorMode\Image::config(), ...uComponent('colorMode.image')])();

    $lightSrc = Vee\UI::refinePath($light);
    $darkSrc = Vee\UI::refinePath($dark);
@endphp

<img
    :src="$lightSrc"
    :$alt
    {{ $attributes->class($self->root('dark:hidden')) }}
/>
<img
    :src="$darkSrc"
    :$alt
    {{ $attributes->class($self->root('hidden dark:block')) }}
/>
