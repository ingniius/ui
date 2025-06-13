@props([
    'size' => null,
])

@php
    $classes = Vee\Ui::classes()->add(
        match ($size) {
            'xs' => '[:where(&)]:size-4',
            'sm' => '[:where(&)]:size-5',
            'md' => '[:where(&)]:size-6',
        },
    );
@endphp

<x-icon name="lucide:monitor" {{ $attributes->class($classes) }} />
