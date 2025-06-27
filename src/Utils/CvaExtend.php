<?php

declare(strict_types=1);

namespace Vee\Utils;

final class CvaExtend
{
    /** @var array<string, mixed> */
    private array $config;

    /**
     * @param  array<string, mixed>  $config
     */
    public function __construct(array $config = [])
    {
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
        $rawDefaultVariants = $this->normalizeVariants($rawDefaultVariantsRaw);

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
        foreach ($rawCompoundVariants as $compound) {
            $compound = $this->normalizeCompound($compound);
            $classEntry = $compound['class'] ?? [];

            if (is_string($classEntry)) {
                $processedDefinitions['root']['compoundVariants'][] = $compound;

                continue;
            }

            if (is_array($classEntry)) {
                foreach ($classEntry as $slotName => $slotClass) {
                    if (! isset($processedDefinitions[$slotName])) {
                        continue;
                    }

                    $slotCompound = $compound;
                    $slotCompound['class'] = $slotClass;

                    $processedDefinitions[$slotName]['compoundVariants'][] = $slotCompound;
                }
            }
        }

        // 4. Instantiate Cva for each slot and apply recipes
        $resolvedClasses = [];
        foreach ($processedDefinitions as $slotName => $definition) {
            $cvaInstance = new Cva(
                base: $this->normalizeBase($definition['base']),
                variants: $definition['variants'],
                compoundVariants: $definition['compoundVariants'],
                defaultVariants: $definition['defaultVariants'],
            );

            $resolvedClasses[$slotName] = (string) $cvaInstance->apply($this->normalizeVariants($recipes));
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

    /**
     * @param  array<string|int|bool, mixed>  $compound
     * @return array<string|int, mixed>
     */
    private function normalizeCompound(array $compound): array
    {
        $result = [];
        foreach ($compound as $key => $value) {
            if ($key === 'class') {
                $result[$key] = $value;

                continue;
            }

            $result[$key] = is_array($value)
                ? array_map(fn ($v) => $this->boolToString($v), $value)
                : $this->boolToString($value);
        }

        return $result;
    }

    /**
     * @param  array<string, mixed>  $recipes
     * @return array<string, string|null>
     */
    private function normalizeVariants(array $recipes): array
    {
        return array_map(
            fn ($value) => $this->boolToString(
                is_int($value) ? (string) $value : $value
            ),
            $recipes
        );
    }

    /**
     * @return mixed|string Returns 'true'|'false' strings if input is boolean, else returns input as-is.
     */
    private function boolToString(mixed $value): mixed
    {
        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }

        return $value;
    }
}
