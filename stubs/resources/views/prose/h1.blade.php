@props([
    'href' => null,
    'ui' => [],
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Prose\H1::theme(), ...useComponents('prose.h1')])();
    ['root' => $rootClass, 'link' => $linkClass] = array_merge(
        ['root' => '', 'link' => ''],
        $ui,
    );
@endphp

<h1 {{ $attributes->class($self->root($rootClass)) }} data-ui-h1>
    @if ($href)
        <a :$href class="{{ $self->link($linkClass) }}">
            {{ $slot }}
        </a>
    @else
        {{ $slot }}
    @endif
</h1>
