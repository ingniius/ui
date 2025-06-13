<?php

declare(strict_types=1);

namespace Ui;

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
        // Laravel 12+ uses xxh128 hashing for views https://github.com/laravel/framework/pull/52301...
        if (app()->version() >= 12) {
            return app('view')->exists(hash('xxh128', 'vee').'::'.$name);
        }

        return app('view')->exists(md5('vee').'::'.$name);
    }
}
