<?php

declare(strict_types=1);

namespace Vee\Utils;

use Closure;

final class CvaSlot
{
    /**
     * @param  array<string, Closure(string|array=): string>  $slots
     */
    public function __construct(private array $slots) {}

    public function __get(string $name): Closure
    {
        return $this->slots[$name] ?? fn () => '';
    }

    public function __call(string $name, array $arguments): string
    {
        return ($this->slots[$name] ?? fn () => '')(...$arguments);
    }

    /**
     * @return array<string, Closure>
     */
    public function all(): array
    {
        return $this->slots;
    }
}
