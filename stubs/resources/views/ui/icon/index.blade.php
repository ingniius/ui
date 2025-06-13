@props([
    'name' => null,
    'size' => 'md',
])

@php
    $classes = Ui\Ui::classes()->add(
        match ($size) {
            'xs' => '[:where(&)]:size-4',
            'sm' => '[:where(&)]:size-5',
            'md' => '[:where(&)]:size-6',
        },
    );
@endphp

<x-icon :name="$name" {{ $attributes->class($classes) }} />
