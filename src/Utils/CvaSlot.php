<?php

declare(strict_types=1);

namespace Vee\Utils;

use Closure;

final class CvaSlot
{
    /**
     * @var array<string, Closure(string|array=): string>
     */
    private array $slots;

    /**
     * @param  array<string, Closure(string|array=): string>  $slots
     */
    public function __construct(array $slots)
    {
        $this->slots = $slots;
    }

    /**
     * @return Closure(string|array=): string
     */
    public function __get(string $name): Closure
    {
        return $this->slots[$name] ?? fn () => '';
    }

    /**
     * @param  array<mixed>  $arguments
     */
    public function __call(string $name, array $arguments): string
    {
        return ($this->slots[$name] ?? fn () => '')(...$arguments);
    }

    /**
     * @return array<string, Closure(string|array=): string>
     */
    public function all(): array
    {
        return $this->slots;
    }
}
