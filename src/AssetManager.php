<?php

declare(strict_types=1);

namespace Ui;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;

final class AssetManager
{
    public static function boot()
    {
        $instance = new self;

        $instance->registerAssetDirective();
        $instance->registerAssetRoutes();
    }

    public static function uiAppearance($options = [])
    {
        $nonce = isset($options) && isset($options['nonce']) ? ' nonce="'.$options['nonce'].'"' : '';

        // Make scrollbars dark in dark mode...
        return <<<HTML
<style$nonce>
    :root.dark {
        color-scheme: dark;
    }
</style>
<script$nonce>
    window.Ui = {
        applyAppearance (appearance) {
            let applyDark = () => document.documentElement.classList.add('dark')
            let applyLight = () => document.documentElement.classList.remove('dark')

            if (appearance === 'system') {
                let media = window.matchMedia('(prefers-color-scheme: dark)')

                window.localStorage.removeItem('ui.appearance')

                media.matches ? applyDark() : applyLight()
            } else if (appearance === 'dark') {
                window.localStorage.setItem('ui.appearance', 'dark')

                applyDark()
            } else if (appearance === 'light') {
                window.localStorage.setItem('ui.appearance', 'light')

                applyLight()
            }
        }
    }

    window.Ui.applyAppearance(window.localStorage.getItem('ui.appearance') || 'system')
</script>
HTML;
    }

    public static function scripts($options = [])
    {
        $manifest = json_decode(file_get_contents(__DIR__.'/../dist/manifest.json'), true);
        $versionHash = $manifest['/ui.js'];
        $nonce = isset($options) && isset($options['nonce']) ? ' nonce="'.$options['nonce'].'"' : '';

        if (config('app.debug')) {
            return "<script src=\"/vee/ui.js?id={$versionHash}\" data-navigate-once{$nonce}></script>";
        }

        return "<script src=\"/vee/ui.min.js?id={$versionHash}\" data-navigate-once{$nonce}></script>";

    }

    public function registerAssetDirective()
    {
        Blade::directive('uiAppearance', function ($expression) {
            return <<<PHP
            {!! app('vee')->uiAppearance($expression) !!}
            PHP;
        });

        Blade::directive('uiScripts', function ($expression) {
            return <<<PHP
            <?php app('livewire')->forceAssetInjection(); ?>
            {!! app('vee')->scripts($expression) !!}
            PHP;
        });
    }

    public function registerAssetRoutes()
    {
        Route::get('/vee/ui.js', [self::class, 'uiJs']);
        Route::get('/vee/ui.min.js', [self::class, 'uiMinJs']);
    }

    public function uiJs()
    {
        return $this->pretendResponseIsFile(__DIR__.'/../dist/ui.js', 'text/javascript');
    }

    public function uiMinJs()
    {
        return $this->pretendResponseIsFile(__DIR__.'/../dist/ui.min.js', 'text/javascript');
    }

    public function pretendResponseIsFile($file, $contentType = 'application/javascript; charset=utf-8')
    {
        $lastModified = filemtime($file);

        return $this->cachedFileResponse($file, $contentType, $lastModified,
            fn ($headers) => response()->file($file, $headers));
    }

    private function cachedFileResponse($filename, $contentType, $lastModified, $downloadCallback)
    {
        $expires = strtotime('+1 year');
        $cacheControl = 'public, max-age=31536000';

        if ($this->matchesCache($lastModified)) {
            return response('', 304, [
                'Expires' => $this->httpDate($expires),
                'Cache-Control' => $cacheControl,
            ]);
        }

        $headers = [
            'Content-Type' => $contentType,
            'Expires' => $this->httpDate($expires),
            'Cache-Control' => $cacheControl,
            'Last-Modified' => $this->httpDate($lastModified),
        ];

        if (str($filename)->endsWith('.br')) {
            $headers['Content-Encoding'] = 'br';
        }

        return $downloadCallback($headers);
    }

    private function matchesCache($lastModified)
    {
        $ifModifiedSince = app(Request::class)->header('if-modified-since');

        return $ifModifiedSince !== null && @strtotime($ifModifiedSince) === $lastModified;
    }

    private function httpDate($timestamp)
    {
        return sprintf('%s GMT', gmdate('D, d M Y H:i:s', $timestamp));
    }
}
