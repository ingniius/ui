@props([
    'light' => null,
    'dark' => null,
    'alt' => null,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\ColorMode\Avatar::config(), ...uComponent('colorMode.avatar')])();

    $lightSrc = Vee\UI::refinePath($light);
    $darkSrc = Vee\UI::refinePath($dark);
@endphp

<vee:avatar
    :src="$lightSrc"
    :$alt
    {{ $attributes->class($self->root('dark:hidden')) }}
/>
<vee:avatar
    :src="$darkSrc"
    :$alt
    {{ $attributes->class($self->root('hidden dark:block')) }}
/>
