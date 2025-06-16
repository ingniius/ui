<?php

declare(strict_types=1);

namespace Vee;

use Closure;
use Illuminate\Support\Str;
use TailwindMerge\TailwindMerge;
use Vee\Features\Asset;
use Vee\Features\ColorMode;
use Vee\Utils\Cva;
use Vee\Utils\Slot;
use Vee\Utils\Tva;

use function Livewire\on;

final class UIManager
{
    /**
     * @var bool
     */
    public $hasRenderedAssets = false;

    /**
     * @var array<string, Closure(array<string, string|null>): array<string, string>>|Closure(array<string, string|null>): array{root: string}>
     */
    private array $tvCache = [];

    private TailwindMerge $tw;

    public function __construct()
    {
        $this->tw = TailwindMerge::instance();
    }

    public function boot(): void
    {
        on('flush-state', function () {
            $this->hasRenderedAssets = false;
        });
    }

    public function markAssetsRendered(): void
    {
        $this->hasRenderedAssets = true;
    }

    /**
     * @param array{
     *     extend?: array<string, mixed>
     *     base?: string|list<string|null>,
     *     slots?: array<string, string|list<string|null>>,
     *     variants?: array<string, array<string, string|array<string, string|list<string|null>>>>,
     *     compoundVariants?: array<array<string, string|array<string>>>,
     *     defaultVariants?: array<string, string>
     * } $config
     * @return Closure(array<string, string|null>): object<string, Closure(string|array=): string>
     */
    public function tv(array $config = []): Closure
    {
        $finalConfig = [];

        if (isset($config['extend']) && is_array($config['extend'])) {
            $extendConfig = $config['extend'];
            unset($config['extend']);

            $finalConfig = $this->recursiveMerge($extendConfig, $config);
        } else {
            $finalConfig = $config;
        }

        $key = method_exists(Str::class, 'xxh128')
            ? (string) Str::of(json_encode($finalConfig))->xxh128()
            : md5(json_encode($finalConfig));

        if (isset($this->tvCache[$key])) {
            return $this->tvCache[$key];
        }

        $isFullConfig = isset($finalConfig['slots']);

        if ($isFullConfig) {
            if (isset($finalConfig['base'])) {
                $finalConfig['slots']['root'] = $this->merge(
                    $finalConfig['slots']['root'] ?? '',
                    $finalConfig['base']
                );

                unset($finalConfig['base']);
            }

            $tvInstance = new Tva($finalConfig);

            return $this->tvCache[$key] = fn (array $recipes = []) => new Slot(array_map(
                fn (string|array $slotClass) => fn (string|array $override = ''): string => $this->merge($slotClass, $override),
                $tvInstance->apply($recipes)
            ));
        }

        $cvaInstance = new Cva(
            base: $finalConfig['base'] ?? '',
            variants: $finalConfig['variants'] ?? [],
            compoundVariants: $finalConfig['compoundVariants'] ?? [],
            defaultVariants: $finalConfig['defaultVariants'] ?? [],
        );

        return $this->tvCache[$key] = fn (array $recipes = []) => new Slot([
            'root' => fn (string|array $override = ''): string => $this->merge($cvaInstance->apply($recipes), $override),
        ]);
    }

    /**
     * @param  array<string, mixed>  $options  Options for rendering assets (e.g., 'nonce' for CSP).
     * @return string The HTML string containing script tags.
     */
    public function scripts(array $options = []): string
    {
        $this->markAssetsRendered();

        return Asset::scripts($options);
    }

    /**
     * @param  array<string, mixed>  $options  Options for rendering (e.g., 'nonce' for CSP).
     * @return string The HTML string containing the style and script for appearance logic.
     */
    public function appearance(array $options = []): string
    {
        $this->markAssetsRendered();

        return ColorMode::appearance($options);
    }

    /**
     * @param  string  $name  The name of the component (e.g., 'button', 'card').
     * @return bool True if the component view exists, false otherwise.
     */
    public function componentExists(string $name): bool
    {
        $uiPrefix = useUI();

        // Laravel 12+ uses xxh128 hashing for views https://github.com/laravel/framework/pull/52301...
        if (app()->version() >= 12) {
            return app('view')->exists(hash('xxh128', $uiPrefix).'::'.$name);
        }

        return app('view')->exists(md5($uiPrefix).'::'.$name);
    }

    public function forwardedAttributes($attributes, $propKeys)
    {
        $unescape = fn ($value) => is_string($value) ? htmlspecialchars_decode($value, ENT_QUOTES) : $value;
        $props = [];

        foreach ($propKeys as $key) {
            // Because Blade automatically escapes all "attributes" (not "props"), it errantly escaped these values.
            // Therefore, we have to apply an "unescape" operation (htmlspecialchars_decode) to rectify that...
            if (isset($attributes[$key])) {
                $props[$key] = $unescape($attributes[$key]);
            }
            // If a kebab-cased prop is present, we need to convert it to camelCase so that @props() picks it up...
            elseif (isset($attributes[Str::kebab($key)])) {
                $props[$key] = $unescape($attributes[Str::kebab($key)]);
            }
        }

        return $props;
    }

    /**
     * @param  (string|array<string|string[]>)  ...$args
     */
    public function merge(string|array ...$args): string
    {
        return $this->tw->merge(...$args);
    }

    /**
     * @param  array<array-key, mixed>  $array1
     * @param  array<array-key, mixed>  $array2
     * @return array<array-key, mixed>
     */
    private function recursiveMerge(array $array1, array $array2): array
    {
        $merged = $array1;

        foreach ($array2 as $key => $value) {
            if (is_array($value) && isset($merged[$key]) && is_array($merged[$key])) {
                $merged[$key] = $this->recursiveMerge($merged[$key], $value);
            } elseif (is_string($value) && isset($merged[$key]) && is_string($merged[$key])) {
                $merged[$key] = $this->merge([$merged[$key], $value]);
            } else {
                $merged[$key] = $value;
            }
        }

        return $merged;
    }
}
