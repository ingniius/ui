@props([
    'as' => null,
])

@if ($as === 'button')
    <button {{ $attributes->merge(['type' => 'button']) }}>
        {{ $slot }}
    </button>
@else
    <div {{ $attributes }}>
        {{ $slot }}
    </div>
@endif
