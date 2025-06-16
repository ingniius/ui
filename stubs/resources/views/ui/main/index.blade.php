@props([
    'container' => false,
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Main::theme(), ...useComponents('main')])(['container' => $container]);
@endphp

<main {{ $attributes->class($self->root()) }} data-ui-main>
    {{ $slot }}
</main>
