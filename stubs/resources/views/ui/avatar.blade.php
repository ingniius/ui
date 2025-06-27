@php
    $iconVariant ??= $attributes->pluck('icon:variant');
@endphp

@props([
    'as' => 'div',
    'alt' => null,
    'href' => null,
    'src' => null,
    'icon' => null,
    'iconVariant' => 'solid',
    'name' => null,
    'initials' => null,
    'rounded' => 'full',
    'size' => 'md',
    'ui' => [],
])

@php
    $self = Vee\UI::tv(['extend' => Vee\Theme\UI\Avatar::config(), ...uComponent('avatar')])(['rounded' => $rounded, 'size' => $size]);
    ['root' => $rootClass, 'image' => $imageClass, 'icon' => $iconClass, 'fallback' => $fallbackClass] = array_merge(['root' => '', 'image' => '', 'icon' => '', 'fallback' => ''], $ui);

    if ($name && ! $initials) {
        $parts = explode(' ', trim($name));

        if ($attributes->pluck('initials:single')) {
            $initials = strtoupper(mb_substr($parts[0], 0, 1));
        } else {
            // Remove empty strings from the array...
            $parts = collect($parts)
                ->filter()
                ->values()
                ->all();

            if (count($parts) > 1) {
                $initials = strtoupper(mb_substr($parts[0], 0, 1) . mb_substr($parts[1], 0, 1));
            } elseif (count($parts) === 1) {
                $initials = strtoupper(mb_substr($parts[0], 0, 1)) . strtolower(mb_substr($parts[0], 1, 1));
            }
        }
    }

    $hasTextContent = $icon ?? ($initials ?? $slot->isNotEmpty());

    if (! $hasTextContent) {
        $icon = 'user';
        $hasTextContent = true;
    }

    $label = $alt ?? $name;
@endphp

<vee:link-base :$as :$href :attributes="$attributes->class($self->root($rootClass))" data-ui-avatar>
    @if ($src)
        <vee:image :$src :alt="$label" class="{{ $self->image($imageClass) }}" />
    @elseif ($icon)
        <vee:icon :$icon :variant="$iconVariant" class="{{ $self->icon($iconClass) }}" />
    @elseif ($hasTextContent)
        <span class="{{ $self->fallback($fallbackClass) }}">{{ $initials ?? $slot }}</span>
    @endif
</vee:link-base>
