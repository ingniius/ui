@props([
    'href' => null,
    'icon' => 'hash',
    'ui' => [],
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Prose\H3::theme(), ...useComponents('prose.h3')])();
    ['root' => $rootClass, 'link' => $linkClass, 'leading' => $leadingClass, 'leadingIcon' => $leadingIconClass] = array_merge(
        ['root' => '', 'link' => '', 'leading' => '', 'leadingIcon' => ''],
        $ui,
    );
@endphp

<h3 {{ $attributes->class($self->root($rootClass)) }} data-ui-h3>
    @if ($href)
        <a :$href class="{{ $self->link($linkClass) }}">
            @if($icon)
                <span class="{{ $self->leading($leadingClass) }}">
                    <vee:icon :$icon class="{{ $self->leadingIcon($leadingIconClass) }}" />
                </span>
            @endif

            {{ $slot }}
        </a>
    @else
        {{ $slot }}
    @endif
</h3>
