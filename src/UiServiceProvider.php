<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\View\ComponentAttributeBag;
use Illuminate\View\Factory as ViewFactory;

final class UiServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->alias(UiManager::class, 'vee');
        $this->app->singleton(UiManager::class);

        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias('vee', Ui::class);
    }

    public function boot(): void
    {
        $this->bootComponentPath();
        $this->bootTagCompiler();
        $this->bootMacros();

        app('livewire')->propertySynthesizer(DateRangeSynth::class);
        AssetManager::boot();

        app('vee')->boot();
        $this->bootCommands();
    }

    public function bootComponentPath()
    {
        if (file_exists(resource_path('views/ui'))) {
            Blade::anonymousComponentPath(resource_path('views/ui'), 'vee');
        }

        Blade::anonymousComponentPath(__DIR__.'/../stubs/resources/views/ui', 'vee');
    }

    public function bootTagCompiler()
    {
        $compiler = new UiTagCompiler(
            app('blade.compiler')->getClassComponentAliases(),
            app('blade.compiler')->getClassComponentNamespaces(),
            app('blade.compiler')
        );

        app()->bind('vee.compiler', fn () => $compiler);

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
