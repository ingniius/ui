@php
    $iconVariant = $iconVariant ??= $attributes->pluck('icon:variant');
@endphp

@props([
    'as' => 'button',
    'color' => null,
    'variant' => null,
    'size' => null,
    'square' => false,
    'leading' => false,
    'loading' => false,
    'trailing' => false,
    'ui' => [],
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI::button(), ...uComponent('button')])(['color' => $color, 'variant' => $variant, 'size' => $size, 'square' => $square, 'leading' => $leading, 'loading' => $loading, 'trailing' => $trailing]);
    ['root' => $rootClass, 'label' => $labelClass, 'leadingIcon' => $leadingIconClass, 'leadingAvatar' => $leadingAvatarClass, 'leadingAvatarSize' => $leadingAvatarSizeClass, 'trailingIcon' => $trailingIconClass] = array_merge(
        ['root' => '', 'label' => '', 'leadingIcon' => '', 'leadingAvatar' => '', 'leadingAvatarSize' => '', 'trailingIcon' => ''],
        $ui,
    );
@endphp

<x-button-or-link :$as :$href :attributes="$attributes->class($self->root($rootClass))" data-ui-button>
    {{ $slot }}
</x-button-or-link>
