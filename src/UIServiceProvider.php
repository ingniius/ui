<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\ComponentAttributeBag;
use Illuminate\View\Factory as ViewFactory;
use Vee\Compilers\TagProse;
use Vee\Compilers\TagUI;
use Vee\Features\Asset;
use Vee\Features\ColorMode;

final class UIServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        if (file_exists(__DIR__.'/../config/ui.php')) {
            $this->mergeConfigFrom(__DIR__.'/../config/ui.php', 'ui');
        }

        $uiPrefix = useUI();

        $this->app->alias(UIManager::class, $uiPrefix);
        $this->app->singleton(UIManager::class);

        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias($uiPrefix, UI::class);
    }

    public function boot(): void
    {
        $uiPrefix = useUI();

        $this->bootComponentPath();
        $this->bootProsePath();

        $this->bootTagUICompiler();
        $this->bootTagProseCompiler();

        $this->bootMacros();

        Asset::boot();
        ColorMode::boot();

        app($uiPrefix)->boot();
        $this->bootCommands();
    }

    /**
     * Boot component paths for anonymous Blade components.
     */
    public function bootComponentPath(): void
    {
        $uiPrefix = useUI();

        if (file_exists(resource_path('views/ui'))) {
            Blade::anonymousComponentPath(resource_path('views/ui'), $uiPrefix);
        }

        Blade::anonymousComponentPath(__DIR__.'/../stubs/resources/views/ui', $uiPrefix);
    }

    /**
     * Boot prose paths for anonymous Blade components.
     */
    public function bootProsePath(): void
    {
        $prosePrefix = useProse();

        if (file_exists(resource_path('views/prose'))) {
            Blade::anonymousComponentPath(resource_path('views/prose'), $prosePrefix);
        }

        Blade::anonymousComponentPath(__DIR__.'/../stubs/resources/views/prose', $prosePrefix);
    }

    /**
     * Boot the custom tag compiler for {prefix}: components.
     */
    public function bootTagUICompiler(): void
    {
        $uiPrefix = useUI();

        $compiler = new TagUI(
            app('blade.compiler')->getClassComponentAliases(),
            app('blade.compiler')->getClassComponentNamespaces(),
            app('blade.compiler')
        );

        app()->bind("{$uiPrefix}.compiler", fn () => $compiler);

        app('blade.compiler')->precompiler(function ($in) use ($compiler) {
            return $compiler->compile($in);
        });
    }

    /**
     * Boot the custom tag compiler for prose: components.
     */
    public function bootTagProseCompiler(): void
    {
        $prosePrefix = useProse();

        $compiler = new TagProse(
            app('blade.compiler')->getClassComponentAliases(),
            app('blade.compiler')->getClassComponentNamespaces(),
            app('blade.compiler')
        );

        app()->bind("{$prosePrefix}.compiler", fn () => $compiler);

        app('blade.compiler')->precompiler(function ($in) use ($compiler) {
            return $compiler->compile($in);
        });
    }

    /**
     * Boot global macros for View and ComponentAttributeBag.
     */
    public function bootMacros(): void
    {
        app('view')::macro('getCurrentComponentData', function () {
            /** @var ViewFactory $this */
            return ((array) $this)['currentComponentData'];
        });

        ComponentAttributeBag::macro('pluck', function (string $key, $default = null) {
            /** @var ComponentAttributeBag $this */
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

        $this->commands([
            Commands\PublishCommand::class,
            Commands\IconCommand::class,
        ]);
    }
}
