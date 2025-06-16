@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Container::theme(), ...useComponents('container')])();
@endphp

<div {{ $attributes->class($self->root()) }} data-ui-container>
    {{ $slot }}
</div>
