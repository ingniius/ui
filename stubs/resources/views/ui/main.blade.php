@props([
    'container' => false,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI\Main::config(), ...uComponent('main')])(['container' => $container]);
@endphp

<main {{ $attributes->class($self->root()) }} data-ui-main>
    {{ $slot }}
</main>
