<?php

declare(strict_types=1);

namespace Vee\Utils;

use TailwindMerge\TailwindMerge;

final class Cva
{
    /**
     * @var list<string|null>
     */
    private array $base;

    /**
     * @param  string|list<string|null>  $base
     * @param  array<string, array<string, string|list<string>|null>>  $variants
     * @param  list<array<string, mixed>>  $compoundVariants
     * @param  array<string, string>  $defaultVariants
     */
    public function __construct(
        string|array $base = [],
        private array $variants = [],
        private array $compoundVariants = [],
        private array $defaultVariants = [],
    ) {
        $this->base = is_string($base) ? [$base] : $base;
    }

    /**
     * @param  array<string, bool|string|null>  $recipes
     */
    public function apply(array $recipes = []): string
    {
        $classes = $this->base;

        // 1. Resolve recipes against variants
        foreach ($recipes as $recipeName => $recipeValue) {
            if (is_bool($recipeValue)) {
                $recipeValue = $recipeValue ? 'true' : 'false';
            }

            $recipeClasses = [];
            if (isset($this->variants[$recipeName])) {
                $recipeClasses = $this->variants[$recipeName][$recipeValue] ?? [];
            }

            foreach ((array) $recipeClasses as $class) {
                $classes[] = $class;
            }
        }

        // 2. Resolve compound variants
        foreach ($this->compoundVariants as $compound) {
            $compoundClasses = $this->resolveCompoundVariant($compound, $recipes);
            foreach ((array) $compoundClasses as $class) {
                $classes[] = $class;
            }
        }

        // 3. Apply default variants if specific recipes aren't provided
        foreach ($this->defaultVariants as $defaultVariantName => $defaultVariantValue) {
            if (! isset($recipes[$defaultVariantName])) {
                $variantClasses = [];
                if (isset($this->variants[$defaultVariantName])) {
                    $variantClasses = $this->variants[$defaultVariantName][$defaultVariantValue] ?? [];
                }

                foreach ((array) $variantClasses as $class) {
                    $classes[] = $class;
                }
            }
        }

        // 4. Cleanup and deduplicate
        $classes = array_filter($classes, 'is_string');
        $merged = implode(' ', $classes);

        return TailwindMerge::instance()->merge($merged);
    }

    /**
     * @param  array<string, mixed>  $compound
     * @param  array<string, bool|string|null>  $recipes
     * @return list<string>
     */
    private function resolveCompoundVariant(array $compound, array $recipes): array
    {
        foreach ($compound as $compoundName => $compoundValues) {
            if ($compoundName === 'class') {
                continue;
            }

            if (! isset($recipes[$compoundName]) || ! in_array($recipes[$compoundName], (array) $compoundValues, true)) {
                return [];
            }
        }

        $classes = $compound['class'] ?? [];

        if (is_string($classes)) {
            return [$classes];
        }

        if (is_array($classes)) {
            return array_values(array_filter($classes, 'is_string'));
        }

        return [];
    }
}
