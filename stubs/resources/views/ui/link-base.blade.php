@php
    extract(
        Vee\UI::forwardedAttributes($attributes, [
            'as',
            'type',
            'current',
            'href',
            'external',
            'disabled',
            'target',
            'rel',
            'noRel',
        ]),
    );
@endphp

@props([
    'as' => null,
    'type' => 'button',
    'current' => null,
    'href' => null,
    'external' => false,
    'disabled' => false,
    'target' => null,
    'rel' => null,
    'noRel' => false,
])

@php
    $refinedHref = str($href)->startsWith(trim(config('app.url'))) ? (string) str($href)->after(trim(config('app.url'), '/')) : $href;

    if ($refinedHref === '') {
        $refinedHref = '/';
    }

    $requestIs = fn ($pattern) => app('livewire')?->isLivewireRequest() ? str()->is($pattern, app('livewire')->originalPath()) : request()->is($pattern);
    $current = $current === null ? ($refinedHref ? $requestIs($refinedHref === '/' ? '/' : trim($refinedHref, '/')) : false) : $current;

    if ($disabled) {
        $attributes = $attributes->except(['href', 'target', 'rel']);
    }

    if ($target === null && $external) {
        $target = '_blank';
    }

    if (! $noRel && $rel === null && $target === '_blank') {
        $rel = 'noopener noreferrer';
    } elseif (is_array($rel)) {
        $rel = implode(' ', $rel);
    }
@endphp

@if ($as === 'div' && ! $href)
    <div
        @if($disabled) aria-disabled="true" role="link" tabindex="-1" @endif
        @if($target) target="{{ $target }}" @endif
        @if($rel) rel="{{ $rel }}" @endif
        {{ $attributes }}
    >
        {{ $slot }}
    </div>
@elseif ($as === 'a' || $href)
    <a
        @if($disabled) aria-disabled="true" role="link" tabindex="-1" @endif
        @if($target) target="{{ $target }}" @endif
        @if($rel) rel="{{ $rel }}" @endif
        href="{!! e($href) !!}"
        {{ $attributes->merge(['data-current' => $current]) }}
    >
        {{ $slot }}
    </a>
@else
    <button
        @if($disabled) aria-disabled="true" role="link" tabindex="-1" @endif
        @if($target) target="{{ $target }}" @endif
        @if($rel) rel="{{ $rel }}" @endif
        {{ $attributes->merge(['type' => $type, 'data-current' => $current]) }}
    >
        {{ $slot }}
    </button>
@endif
