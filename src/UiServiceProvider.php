<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\ComponentAttributeBag;
use Illuminate\View\Factory as ViewFactory;

final class UiServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $uiPrefix = Config::get('ui.prefix', 'vee');

        $this->app->alias(UiManager::class, $uiPrefix);
        $this->app->singleton(UiManager::class);

        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias($uiPrefix, Ui::class);
    }

    public function boot(): void
    {
        $uiPrefix = Config::get('ui.prefix', 'vee');

        $this->bootComponentPath();
        $this->bootTagCompiler();
        $this->bootMacros();

        app('livewire')->propertySynthesizer(DateRangeSynth::class);
        AssetManager::boot();

        app($uiPrefix)->boot();
        $this->bootCommands();
    }

    public function bootComponentPath()
    {
        $uiPrefix = Config::get('ui.prefix', 'vee');

        if (file_exists(resource_path('views/ui'))) {
            Blade::anonymousComponentPath(resource_path('views/ui'),  $uiPrefix);
        }

        Blade::anonymousComponentPath(__DIR__.'/../stubs/resources/views/ui',  $uiPrefix);
    }

    public function bootTagCompiler()
    {
        $uiPrefix = Config::get('ui.prefix', 'vee');

        $compiler = new UiTagCompiler(
            app('blade.compiler')->getClassComponentAliases(),
            app('blade.compiler')->getClassComponentNamespaces(),
            app('blade.compiler')
        );

        app()->bind("{$uiPrefix}.compiler", fn () => $compiler);

        app('blade.compiler')->precompiler(function ($in) use ($compiler) {
            return $compiler->compile($in);
        });
    }

    public function bootMacros()
    {
        app('view')::macro('getCurrentComponentData', function () {
            /** @var ViewFactory $this */
            return ((array) $this)['currentComponentData'];
        });

        ComponentAttributeBag::macro('pluck', function ($key) {
            /** @var ComponentAttributeBag $this */
            $result = $this->get($key);

            $this->forget($key);

            return $result;
        });
    }

    public function bootCommands()
    {
        if (! $this->app->runningInConsole()) {
            return;
        }

        $this->commands([
            Console\PublishCommand::class,
            Console\IconCommand::class,
        ]);
    }
}
