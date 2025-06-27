<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <title>{{ $title ?? config('app.name') }}</title>

        <link rel="icon" href="https://fav.farm/🌈" />

        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=inter:400,500,600,700&display=swap" rel="stylesheet" />

        @vite(['resources/css/app.css', 'resources/js/app.mjs'])
        @uiAppearance
    </head>

    <body>
        <vee:main class="flex flex-col items-center justify-center">
            {{ $slot }}
        </vee:main>

        @uiScripts
    </body>
</html>
