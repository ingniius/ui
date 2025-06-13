<?php

declare(strict_types=1);

namespace Ui;

use Illuminate\Support\Arr;
use Stringable;
use TailwindMerge\TailwindMerge;

use function tap;

final class ClassBuilder implements Stringable
{
    /**
     * @var array<string> An array to hold individual class strings.
     */
    private array $pending = [];

    /**
     * @var TailwindMerge The instance of TailwindMerge used for merging.
     */
    private TailwindMerge $tw;

    public function __construct()
    {
        $this->tw = TailwindMerge::instance();
    }

    /**
     * Returns the final, merged class string.
     */
    public function __toString(): string
    {
        return $this->merge(collect($this->pending)->join(' '));
    }

    /**
     * Adds classes to the builder.
     *
     * @param  string|array|null  $classes  A string, array of strings or null.
     * @return $this
     */
    public function add(string|array|null $classes): self
    {
        return tap($this, function (self $instance) use ($classes) {
            $instance->pending[] = Arr::toCssClasses($classes);
        });
    }

    /**
     * Merges a given set of Tailwind CSS classes using the TailwindMerge instance.
     *
     * @param  string  ...$classes  One or more space-separated strings of Tailwind CSS classes.
     * @return string The merged class string.
     */
    public function merge(string ...$classes): string
    {
        return $this->tw->merge(...$classes);
    }
}
