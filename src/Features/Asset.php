<?php

declare(strict_types=1);

namespace Vee\Features;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

final class Asset
{
    public static function boot(): void
    {
        $instance = new self;

        $instance->registerAssetDirectives();
        $instance->registerAssetRoutes();
    }

    /**
     * Generates HTML for @uiScripts.
     *
     * @param  array<string, mixed>  $options  Options for rendering (e.g., 'nonce').
     * @return string The HTML string containing the script tag.
     */
    public static function scripts($options = []): string
    {
        $uiPrefix = useUI();

        $manifestContent = file_get_contents(__DIR__.'/../../build/manifest.json') ?: '{}';
        $manifest = json_decode($manifestContent, true);

        $versionHash = '';
        if (is_array($manifest) && isset($manifest['/ui.js']) && is_string($manifest['/ui.js'])) {
            $versionHash = $manifest['/ui.js'];
        }

        $nonce = '';
        if (isset($options['nonce']) && is_string($options['nonce'])) {
            $nonce = ' nonce="'.$options['nonce'].'"';
        }

        if (config('app.debug')) {
            return "<script src=\"/{$uiPrefix}/ui.js?id={$versionHash}\" data-navigate-once{$nonce}></script>";
        }

        return "<script src=\"/{$uiPrefix}/ui.min.js?id={$versionHash}\" data-navigate-once{$nonce}></script>";

    }

    /**
     * Registers Blade directives for @uiScripts.
     */
    public function registerAssetDirectives(): void
    {
        $uiPrefix = useUI();

        Blade::directive('uiScripts', fn ($expression) => <<<PHP
            <?php app('livewire')->forceAssetInjection(); ?>
            {!! app('{$uiPrefix}')->scripts($expression) !!}
        PHP);
    }

    /**
     * Registers routes for serving static assets.
     */
    public function registerAssetRoutes(): void
    {
        $uiPrefix = useUI();

        Route::get("/{$uiPrefix}/ui.js", [self::class, 'uiJs']);
        Route::get("/{$uiPrefix}/ui.min.js", [self::class, 'uiMinJs']);
    }

    /**
     * Serves the unminified UI JavaScript file.
     */
    public function uiJs(): Response
    {
        return $this->pretendResponseIsFile(__DIR__.'/../../build/ui.js', 'text/javascript');
    }

    /**
     * Serves the minified UI JavaScript file.
     */
    public function uiMinJs(): Response
    {
        return $this->pretendResponseIsFile(__DIR__.'/../../build/ui.min.js', 'text/javascript');
    }

    /**
     * Creates a file response, setting appropriate headers.
     *
     * @param  string  $file  The path to the file.
     * @param  string  $contentType  The content type of the file.
     */
    public function pretendResponseIsFile($file, $contentType = 'application/javascript; charset=utf-8'): Response
    {
        $lastModified = @filemtime($file) ?: time();

        return $this->cachedFileResponse($file, $contentType, $lastModified,
            fn (array $headers): Response => response()->file($file, $headers));
    }

    /**
     * @param  callable(array<string, string>): Response  $downloadCallback
     */
    private function cachedFileResponse(string $filename, string $contentType, int $lastModified, callable $downloadCallback): Response
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

    /**
     * Checks if the client's cache is still valid.
     *
     * @param  int  $lastModified  The last modified timestamp of the file.
     */
    private function matchesCache($lastModified): bool
    {
        $ifModifiedSince = app(Request::class)->header('if-modified-since');

        return is_string($ifModifiedSince) && @strtotime($ifModifiedSince) === $lastModified;
    }

    /**
     * Formats a timestamp into an HTTP-date string.
     *
     * @param  int  $timestamp  The timestamp to format.
     */
    private function httpDate($timestamp): string
    {
        return sprintf('%s GMT', gmdate('D, d M Y H:i:s', $timestamp));
    }
}
