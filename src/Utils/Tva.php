<?php

declare(strict_types=1);

namespace Vee\Utils;

final class Tva
{
    /** @var array<string, mixed> */
    private array $config;

    /**
     * @param  array<string, mixed>  $config
     */
    public function __construct(
        array $config = [],
    ) {
        $this->config = $config;
    }

    /**
     * @param  array<string, string|null>  $recipes
     * @return array<string, string>
     */
    public function apply(array $recipes = []): array
    {
        /** @var array<string, string|list<string>|array<string, string|list<string>|null>> $rawSlots */
        $rawSlots = is_array($this->config['slots'] ?? null) ? $this->config['slots'] : [];

        /** @var array<string, array<string, string|array<string, string>|null>|string> $rawVariants */
        $rawVariants = is_array($this->config['variants'] ?? null) ? $this->config['variants'] : [];

        /** @var list<array<string, mixed>> $rawCompoundVariants */
        $rawCompoundVariants = is_array($this->config['compoundVariants'] ?? null) ? $this->config['compoundVariants'] : [];

        /** @var array<string, string> $rawDefaultVariantsRaw */
        $rawDefaultVariantsRaw = is_array($this->config['defaultVariants'] ?? null) ? $this->config['defaultVariants'] : [];
        $rawDefaultVariants = $this->filterStringArray($rawDefaultVariantsRaw);

        $processedDefinitions = [];

        // 1. Initialize each slot definition from slots config
        foreach ($rawSlots as $slotName => $baseClasses) {
            $processedDefinitions[$slotName] = [
                'base' => $baseClasses,
                'variants' => [],
                'compoundVariants' => [],
                'defaultVariants' => $rawDefaultVariants,
            ];
        }

        /** @var string|list<string|null> $normalizedRootBase */
        $normalizedRootBase = $this->normalizeBase($rawSlots['root'] ?? '');

        // Guarantee 'root' slot always exists once here
        if (! array_key_exists('root', $processedDefinitions)) {
            $processedDefinitions['root'] = $this->emptySlot($rawDefaultVariants, $normalizedRootBase);
        }

        // 2. Distribute variants into each slot's variants array
        foreach ($rawVariants as $variantKey => $variantValues) {
            if (! is_iterable($variantValues)) {
                continue;
            }

            foreach ($variantValues as $variantName => $variantClassOrSlotMap) {
                if (is_string($variantClassOrSlotMap)) {
                    $processedDefinitions['root']['variants'][$variantKey][$variantName] = $variantClassOrSlotMap;
                } elseif (is_array($variantClassOrSlotMap)) {
                    foreach ($variantClassOrSlotMap as $slotName => $slotClasses) {
                        if (! isset($processedDefinitions[$slotName])) {
                            $processedDefinitions[$slotName] = $this->emptySlot($rawDefaultVariants, '');
                        }
                        $processedDefinitions[$slotName]['variants'][$variantKey][$variantName] = $slotClasses;
                    }
                }
            }
        }

        // 3. Apply compound variants to the root slot (root is guaranteed)
        if ($rawCompoundVariants !== []) {
            $processedDefinitions['root']['compoundVariants'] = $rawCompoundVariants;
        }

        // 4. Instantiate Cva for each slot and apply recipes
        $resolvedClasses = [];
        foreach ($processedDefinitions as $slotName => $definition) {
            /** @var string|list<string|null> $base */
            $base = $this->normalizeBase($definition['base']);

            /** @var array<string, array<string, string|list<string>|null>> $variants */
            $variants = $definition['variants'];

            /** @var list<array<string, mixed>> $compoundVariants */
            $compoundVariants = $definition['compoundVariants'];

            /** @var array<string, string> $defaultVariants */
            $defaultVariants = $definition['defaultVariants'];

            $cvaInstance = new Cva(
                base: $base,
                variants: $variants,
                compoundVariants: $compoundVariants,
                defaultVariants: $defaultVariants,
            );

            $resolvedClasses[$slotName] = (string) $cvaInstance->apply($recipes);
        }

        /** @var array<string, string> $resolvedClasses */
        return $resolvedClasses;
    }

    /**
     * @param  array<string, string>  $rawDefaultVariants
     * @param  string|list<string|null>  $base
     * @return array{
     *     base: string|list<string|null>,
     *     variants: array<string, array<string, string|list<string>|null>>,
     *     compoundVariants: list<array<string, mixed>>,
     *     defaultVariants: array<string, string>
     * }
     */
    private function emptySlot(array $rawDefaultVariants, string|array $base = ''): array
    {
        return [
            'base' => $base,
            'variants' => [],
            'compoundVariants' => [],
            'defaultVariants' => $rawDefaultVariants,
        ];
    }

    /**
     * @param  array<mixed, mixed>  $array
     * @return array<string, string>
     */
    private function filterStringArray(array $array): array
    {
        /** @var array<string, string> $result */
        $result = array_filter(
            $array,
            fn ($v) => is_string($v),
            ARRAY_FILTER_USE_BOTH
        );

        return $result;
    }

    /**
     * @param  string|array<int|string, string|list<string>|string|null>  $base
     * @return string|list<string|null>
     */
    private function normalizeBase(string|array $base): string|array
    {
        if (is_string($base)) {
            return $base;
        }

        /** @var list<string|null> $filtered */
        $filtered = array_filter($base, fn ($v) => is_string($v) || $v === null);

        return $filtered;
    }
}
