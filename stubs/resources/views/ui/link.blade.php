@props([
    'as' => 'a',
    'type' => 'button',
    'label' => null,
    'href' => null,
    'disabled' => false,
    'color' => 'neutral',
    'variant' => 'ghost',
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI\Link::config(), ...uComponent('link')])(['disabled' => $disabled, 'color' => $color, 'variant' => $variant]);
@endphp

<vee:link-base :$as :$disabled :$href :$type :attributes="$attributes->class($self->root())" data-ui-link>
    {{ $label ?? $slot }}
</vee:link-base>
