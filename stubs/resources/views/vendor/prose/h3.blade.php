@php
    $iconVariant = $iconVariant ??= $attributes->pluck('icon:variant');
@endphp

@props([
    'href' => null,
    'icon' => 'hash',
    'iconVariant' => 'micro',
    'ui' => [],
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\Prose::h3(), ...uComponent('prose.h3')])();
    ['root' => $rootClass, 'link' => $linkClass, 'leading' => $leadingClass, 'leadingIcon' => $leadingIconClass] = array_merge(
        ['root' => '', 'link' => '', 'leading' => '', 'leadingIcon' => ''],
        $ui,
    );
@endphp

<h3 {{ $attributes->class($self->root($rootClass)) }} data-ui-h3>
    @if ($href)
        <a :$href class="{{ $self->link($linkClass) }}">
            @if ($icon)
                <span class="{{ $self->leading($leadingClass) }}">
                    <vee:icon :$icon :variant="$iconVariant" class="{{ $self->leadingIcon($leadingIconClass) }}" />
                </span>
            @endif

            {{ $slot }}
        </a>
    @else
        {{ $slot }}
    @endif
</h3>
