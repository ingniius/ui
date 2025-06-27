<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\ComponentAttributeBag;
use Vee\Features\ColorMode;
use Vee\Features\ScriptAsset;
use Vee\Utils\TagCompiler;

final class UIServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $key = uKey();

        if (file_exists(__DIR__.'/../config/ui.php')) {
            $this->mergeConfigFrom(__DIR__.'/../config/ui.php', $key);
        }

        $this->app->alias(UIManager::class, $key);
        $this->app->singleton(UIManager::class);

        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias($key, UI::class);
    }

    public function boot(): void
    {
        $this->bootComponents();
        $this->bootTagCompilers();
        $this->bootMacros();

        ColorMode::boot();
        ScriptAsset::boot();

        app(uKey())->boot();
        $this->bootCommands();
    }

    /**
     * Boot component paths for anonymous Blade components.
     */
    public function bootComponents(): void
    {
        $prefix = uPrefix();

        $this->registerComponentPath(resource_path('views/ui'), $prefix);
        $this->registerComponentPath(__DIR__.'/../stubs/resources/views/ui', $prefix);

        if (Config::get('ui.colorMode', true)) {
            $this->registerComponentPath(resource_path('views/vendor/color-mode'), 'color-mode');
            $this->registerComponentPath(__DIR__.'/../stubs/resources/views/vendor/color-mode', 'color-mode');
        }

        if (Config::get('ui.mdc', true)) {
            $this->registerComponentPath(resource_path('views/vendor/prose'), 'prose');
            $this->registerComponentPath(__DIR__.'/../stubs/resources/views/vendor/prose', 'prose');
        }

        if ($prefix !== 'vee') {
            $this->registerComponentPath(resource_path('views/ui'), 'vee');
            $this->registerComponentPath(__DIR__.'/../stubs/resources/views/ui', 'vee');
        }

    }

    /**
     * Boot the custom tag compiler for tagged: components.
     */
    public function bootTagCompilers(): void
    {
        $prefix = uPrefix();

        $this->registerTagCompiler($prefix);

        if (Config::get('ui.colorMode', true)) {
            $this->registerTagCompiler('color-mode');
        }

        if (Config::get('ui.mdc', true)) {
            $this->registerTagCompiler('prose');
        }

        if ($prefix !== 'vee') {
            $this->registerTagCompiler('vee');
        }
    }

    /**
     * Boot global macros for ComponentAttributeBag.
     */
    public function bootMacros(): void
    {
        ComponentAttributeBag::macro('pluck', function (string $key, $default = null) {
            $attributes = $this->getAttributes();
            $result = $attributes[$key] ?? $default;

            unset($attributes[$key]);
            $this->setAttributes($attributes);

            return $result;
        });
    }

    /**
     * Register package commands if running in console.
     */
    public function bootCommands(): void
    {
        if (! $this->app->runningInConsole()) {
            return;
        }
    }

    private function registerComponentPath(string $path, string $prefix): void
    {
        if (file_exists($path)) {
            Blade::anonymousComponentPath($path, $prefix);
        }
    }

    private function registerTagCompiler(string $prefix): void
    {
        $compiler = new TagCompiler(
            $prefix,
            app('blade.compiler')->getClassComponentAliases(),
            app('blade.compiler')->getClassComponentNamespaces(),
            app('blade.compiler')
        );

        app()->bind("{$prefix}.compiler", fn () => $compiler);
        app('blade.compiler')->precompiler(fn ($in) => $compiler->compile($in));
    }
}
