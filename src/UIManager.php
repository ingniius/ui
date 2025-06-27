<?php

declare(strict_types=1);

namespace Vee;

use Closure;
use Illuminate\Support\Str;
use TailwindMerge\TailwindMerge;
use Vee\Features\ColorMode;
use Vee\Features\ScriptAsset;
use Vee\Utils\Cva;
use Vee\Utils\CvaExtend;
use Vee\Utils\CvaSlot;

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
                $finalConfig['slots']['root'] = $this->merge($finalConfig['slots']['root'] ?? '', $finalConfig['base']);
                unset($finalConfig['base']);
            }

            $cvaInstance = new CvaExtend($finalConfig);

            return $this->tvCache[$key] = fn (array $recipes = []) => new CvaSlot(array_map(
                fn (string|array $slotClass) => fn (string|array $override = ''): string => $this->merge($slotClass, $override),
                $cvaInstance->apply($recipes)
            ));
        }

        $cvaInstance = new Cva(
            base: $finalConfig['base'] ?? '',
            variants: $finalConfig['variants'] ?? [],
            compoundVariants: $finalConfig['compoundVariants'] ?? [],
            defaultVariants: $finalConfig['defaultVariants'] ?? [],
        );

        return $this->tvCache[$key] = fn (array $recipes = []) => new CvaSlot([
            'root' => fn (string|array $override = ''): string => $this->merge($cvaInstance->apply($recipes), $override),
        ]);
    }

    /**
     * @param  array<string, mixed>  $attributes
     * @param  array<string, mixed>  $propKeys
     * @return array<string, mixed>
     */
    public function forwardedAttributes($attributes, $propKeys): array
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
     * @param  array<string, mixed>  $options  Options for rendering (e.g., 'nonce' for CSP).
     * @return string The HTML string containing the style and script for appearance logic.
     */
    public function appearance(array $options = []): string
    {
        $this->markAssetsRendered();

        return ColorMode::appearance($options);
    }

    /**
     * @param  array<string, mixed>  $options  Options for rendering assets (e.g., 'nonce' for CSP).
     * @return string The HTML string containing script tags.
     */
    public function scripts(array $options = []): string
    {
        $this->markAssetsRendered();

        return ScriptAsset::scripts($options);
    }

    /**
     * @param  (string|array<string|string[]>)  ...$args
     */
    public function merge(string|array ...$args): string
    {
        return TailwindMerge::instance()->merge(...$args);
    }

    /**
     * @param  (?string)  ...$src
     */
    public function refinePath(?string $src): ?string
    {
        if (is_string($src) && str_starts_with($src, '/') && ! str_starts_with($src, '//')) {
            $base = mb_rtrim(config('app.url'), '/').'/';
            $normalized = '/'.mb_ltrim($src, '/');

            if ($base !== '/' && ! str_starts_with($src, $base)) {
                return mb_rtrim($base, '/').$normalized;
            }
        }

        return $src;
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
