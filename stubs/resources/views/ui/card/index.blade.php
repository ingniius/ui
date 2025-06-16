@props([
    'variant' => '',
    'ui' => [],
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Card::theme(), ...useComponents('card')])(['variant' => $variant]);
    ['root' => $rootClass, 'header' => $headerClass, 'body' => $bodyClass, 'footer' => $footerClass] = array_merge(
        ['root' => '', 'header' => '', 'body' => '', 'footer' => ''],
        $ui,
    );
@endphp

<div {{ $attributes->class($self->root($rootClass)) }} data-ui-card>
    @isset($header)
        <div {{ $header->attributes->class($self->header($headerClass)) }} data-ui-card-header>
            {{ $header }}
        </div>
    @endisset

    <div class="{{ $self->body($bodyClass) }}" data-ui-card-body>
        {{ $slot }}
    </div>

    @isset($footer)
        <div {{ $footer->attributes->class($self->footer($footerClass)) }} data-ui-card-footer>
            {{ $footer }}
        </div>
    @endisset
</div>
