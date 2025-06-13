@php
    $classes = Vee\Ui::classes()->add('mx-auto w-full [:where(&)]:max-w-(--ui-container) px-6 lg:px-8');
@endphp

<div {{ $attributes->class($classes) }} data-ui-container>
    {{ $slot }}
</div>
