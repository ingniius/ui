<?php

declare(strict_types=1);

return [

    'prefix' => 'vee',

    'colorMode' => true,

    'mdc' => false,

    'colors' => [
        'primary' => 'purple',
        'secondary' => 'lime',
        'success' => 'green',
        'info' => 'blue',
        'warning' => 'yellow',
        'error' => 'red',
        'neutral' => 'zinc',
    ],

    'icons' => [
        'dark' => ['solid' => 'heroicons-solid:moon', 'outline' => 'heroicons-outline:moon'],
        'hash' => ['solid' => 'heroicons-solid:hashtag',  'outline' => 'heroicons-outline:hashtag'],
        'light' => ['solid' => 'heroicons-solid:sun',  'outline' => 'heroicons-outline:sun'],
        'loading' => ['solid' => 'svg-spinners:180-ring-with-bg',  'outline' => 'svg-spinners:180-ring'],
        'system' => ['solid' => 'heroicons-solid:computer-desktop',  'outline' => 'heroicons-outline:computer-desktop'],
        'user' => ['solid' => 'heroicons-solid:user',  'outline' => 'heroicons-outline:user'],
    ],

    'iconset' => 'solid',

    'components' => [],

    'transitions' => true,

];
