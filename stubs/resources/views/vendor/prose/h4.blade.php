@props([
    'href' => null,
    'ui' => [],
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Prose\H4::config(), ...uComponent('prose.h4')])();
    ['root' => $rootClass, 'link' => $linkClass] = array_merge(['root' => '', 'link' => ''], $ui);
@endphp

<h4 {{ $attributes->class($self->root($rootClass)) }} data-ui-h4>
    @if ($href)
        <a :$href class="{{ $self->link($linkClass) }}">
            {{ $slot }}
        </a>
    @else
        {{ $slot }}
    @endif
</h4>
