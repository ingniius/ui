@props([
    'href' => null,
    'icon' => 'hash',
    'ui' => [],
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Prose\H2::theme(), ...useComponents('prose.h2')])();
    ['root' => $rootClass, 'link' => $linkClass, 'leading' => $leadingClass, 'leadingIcon' => $leadingIconClass] = array_merge(
        ['root' => '', 'link' => '', 'leading' => '', 'leadingIcon' => ''],
        $ui,
    );
@endphp

<h2 {{ $attributes->class($self->root($rootClass)) }} data-ui-h2>
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
</h2>
