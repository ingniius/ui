@php
    $json = []
@endphp

<vee:main class="flex flex-col items-center gap-8 lg:justify-center">
    <vee:container
        class="flex flex-col items-center justify-center gap-4 opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0"
    >
        <h1 class="text-bold text-primary text-4xl">
            {{ __('@playground') }}
        </h1>

        <!-- <pre class="text-muted text-xs">
            {!! json_encode($json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) !!}
        </pre> -->
    </vee:container>
</vee:main>
