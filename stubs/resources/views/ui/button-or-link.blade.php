@php
    extract(
        Vee\UI::forwardedAttributes($attributes, [
            'as',
            'type',
            'current',
            'href',
        ]),
    );
@endphp

@props([
    'as' => null,
    'type' => 'button',
    'current' => null,
    'href' => null,
])

@php
    $hrefForCurrentDetection = str($href)->startsWith(trim(config('app.url'))) ? (string) str($href)->after(trim(config('app.url'), '/')) : $href;

    if ($hrefForCurrentDetection === '') {
        $hrefForCurrentDetection = '/';
    }

    $requestIs = function ($pattern) {
        // Support current route detection during Livewire update requests as well...
        return app('livewire')?->isLivewireRequest() ? str()->is($pattern, app('livewire')->originalPath()) : request()->is($pattern);
    };

    $current = $current === null ? ($hrefForCurrentDetection ? $requestIs($hrefForCurrentDetection === '/' ? '/' : trim($hrefForCurrentDetection, '/')) : false) : $current;
@endphp

@if ($as === 'div' && ! $href)
    <div {{ $attributes }}>
        {{ $slot }}
    </div>
@elseif ($as === 'a' || $href)
    {{-- We are using e() here to escape the href attribute value instead of "{{ }}" because the latter will escape the entire attribute value, including the "&" character... --}}
    <a href="{!! e($href) !!}" {{ $attributes->merge(['data-current' => $current]) }}>
        {{ $slot }}
    </a>
@else
    <button {{ $attributes->merge(['type' => $type, 'data-current' => $current]) }}>
        {{ $slot }}
    </button>
@endif
