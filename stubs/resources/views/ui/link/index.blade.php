@props([
    'type' => 'button',
    'label' => null,
    'disabled' => false,
    'external' => null,
    'color' => null,
    'variant' => null,
    'target' => null,
    'rel' => null,
    'noRel' => false,
])

@php
    $self = Vee\UI::tv([
        'extend' => Vee\Theme\Link::theme(),
        ...useComponents('link'),
    ])(['disabled' => $disabled, 'color' => $color, 'variant' => $variant]);

    if ($disabled) {
        $attributes = $attributes->except(['href', 'target', 'rel']);
    }

    if ($target === null && $external) {
        $target = '_blank';
    }

    if (! $noRel && $rel === null && $target === '_blank') {
        $rel = 'noopener noreferrer';
    } elseif (is_array($rel)) {
        $rel = implode(' ', $rel);
    }
@endphp

<a
    type="{{ $type }}"
    @if($disabled) aria-disabled="true" tabindex="-1" @endif
    @if($target) target="{{ $target }}" @endif
    @if($rel) rel="{{ $rel }}" @endif
    {{ $attributes->class($self->root()) }}
    data-ui-link
>
    {{ $label ?? $slot }}
</a>
