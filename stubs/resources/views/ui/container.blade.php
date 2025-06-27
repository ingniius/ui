@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI::container(), ...uComponent('container')])();
@endphp

<div {{ $attributes->class($self->root()) }} data-ui-container>
    {{ $slot }}
</div>
