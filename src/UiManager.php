<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Config;

use function Livewire\on;

final class UiManager
{
    public $hasRenderedAssets = false;

    public function boot()
    {
        on('flush-state', function () {
            $this->hasRenderedAssets = false;
        });
    }

    public function markAssetsRendered()
    {
        $this->hasRenderedAssets = true;
    }

    public function classes($styles = null)
    {
        $builder = new ClassBuilder;

        return $styles ? $builder->add($styles) : $builder;
    }

    public function uiAppearance($options = [])
    {
        $this->markAssetsRendered();

        return AssetManager::uiAppearance($options);
    }

    public function scripts($options = [])
    {
        $this->markAssetsRendered();

        return AssetManager::scripts($options);
    }

    public function componentExists($name)
    {
        $uiPrefix = Config::get('ui.prefix', 'vee');

        // Laravel 12+ uses xxh128 hashing for views https://github.com/laravel/framework/pull/52301...
        if (app()->version() >= 12) {
            return app('view')->exists(hash('xxh128',  $uiPrefix).'::'.$name);
        }

        return app('view')->exists(md5( $uiPrefix).'::'.$name);
    }
}
