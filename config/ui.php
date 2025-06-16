<?php

declare(strict_types=1);

return [

    'prefix' => 'vee',

    'components' => [],

    'theme' => [
        'colors' => [
            'primary' => 'indigo',
            'secondary' => 'teal',
            'success' => 'green',
            'info' => 'blue',
            'warning' => 'yellow',
            'error' => 'red',
            'neutral' => 'zinc',
        ],
        'icons' => [
            'dark' => ['solid' => 'heroicons-solid:moon', 'outline' => 'heroicons-outline:moon'],
            'light' => ['solid' => 'heroicons-solid:sun',  'outline' => 'heroicons-outline:sun'],
            'system' => ['solid' =>'heroicons-solid:color-swatch',  'outline' => 'heroicons-outline:color-swatch'],
            'user' => ['solid' =>'heroicons-solid:user',  'outline' => 'heroicons-outline:user'],
        ],
        'transitions' => true,
    ],

];
