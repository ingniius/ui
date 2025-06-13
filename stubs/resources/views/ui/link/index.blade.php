@props([
    'external' => null,
])

@php
    $classes = Ui\Ui::classes()
        ->add('focus-visible:outline-primary')
        ->add('inline font-medium');
@endphp

<a
    {{ $attributes->class($classes) }}
    @if($external) target="_blank" @endif
    data-ui-link
>
    {{ $slot }}
</a>
