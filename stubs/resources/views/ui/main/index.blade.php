@props([
    'container' => null,
])

@php
    $classes = Ui\Ui::classes()
        ->add('min-h-[calc(100vh-var(--ui-header-height))]')
        ->add('p-6 lg:p-8')
        ->add('[[data-ui-container]_&]:px-0') // If there is a wrapping container, let IT handle the x padding...
        ->add($container ? 'mx-auto w-full [:where(&)]:max-w-7xl' : '');
@endphp

<main {{ $attributes->class($classes) }} data-ui-main>
    {{ $slot }}
</main>
