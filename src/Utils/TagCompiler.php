<?php

declare(strict_types=1);

namespace Vee\Utils;

use Illuminate\View\Compilers\ComponentTagCompiler;
use InvalidArgumentException;

final class TagCompiler extends ComponentTagCompiler
{
    public function __construct(
        protected string $prefix,
        array $aliases,
        array $namespaces,
        $compiler
    ) {
        parent::__construct($aliases, $namespaces, $compiler);
    }

    public function componentString(string $component, array $attributes): string
    {
        return parent::componentString($component, $attributes);
    }

    /**
     * Compile the opening tags within the given string.
     *
     * @return string
     *
     * @throws InvalidArgumentException
     */
    protected function compileOpeningTags(string $value): array|string|null
    {
        $prefix = $this->prefix;
        $escapedUIPrefix = preg_quote($this->prefix, '/');

        $pattern = "/
            <
                \s*
                {$escapedUIPrefix}[\:]([\w\-\:\.]*)
                (?<attributes>
                    (?:
                        \s+
                        (?:
                            (?:
                                @(?:class)(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                @(?:style)(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                \{\{\s*\\\$attributes(?:[^}]+?)?\s*\}\}
                            )
                            |
                            (?:
                                (\:\\\$)(\w+)
                            )
                            |
                            (?:
                                [\w\-:.@%]+
                                (
                                    =
                                    (?:
                                        \\\"[^\\\"]*\\\"
                                        |
                                        \'[^\']*\'
                                        |
                                        [^\'\\\"=<>]+
                                    )
                                )?
                            )
                        )
                    )*
                    \s*
                )
                (?<![\/=\-])
            >
        /x";

        return preg_replace_callback($pattern, function (array $matches) use ($prefix) {
            $this->boundAttributes = [];

            $attributes = $this->getAttributesFromAttributeString($matches['attributes']);

            return $this->componentString("{$prefix}::{$matches[1]}", $attributes);
        }, $value);
    }

    /**
     * Compile the self-closing tags within the given string.
     *
     * @return string
     *
     * @throws InvalidArgumentException
     */
    protected function compileSelfClosingTags(string $value): array|string|null
    {
        $prefix = $this->prefix;
        $escapedUIPrefix = preg_quote($prefix, '/');

        $pattern = "/
            <
                \s*
                {$escapedUIPrefix}[\:]([\w\-\:\.]*)
                \s*
                (?<attributes>
                    (?:
                        \s+
                        (?:
                            (?:
                                @(?:class)(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                @(?:style)(\( (?: (?>[^()]+) | (?-1) )* \))
                            )
                            |
                            (?:
                                \{\{\s*\\\$attributes(?:[^}]+?)?\s*\}\}
                            )
                            |
                            (?:
                                (\:\\\$)(\w+)
                            )
                            |
                            (?:
                                [\w\-:.@%]+
                                (
                                    =
                                    (?:
                                        \\\"[^\\\"]*\\\"
                                        |
                                        \'[^\']*\'
                                        |
                                        [^\'\\\"=<>]+
                                    )
                                )?
                            )
                        )
                    )*
                    \s*
                )
            \/>
        /x";

        return preg_replace_callback($pattern, function (array $matches) use ($prefix) {
            $this->boundAttributes = [];

            $attributes = $this->getAttributesFromAttributeString($matches['attributes']);

            // Support inline "slot" attributes...
            if (isset($attributes['slot'])) {
                $slot = $attributes['slot'];

                unset($attributes['slot']);

                return '@slot('.$slot.') '.$this->componentString("{$prefix}::{$matches[1]}", $attributes)."\n@endComponentClass##END-COMPONENT-CLASS##".' @endslot';
            }

            return $this->componentString("{$prefix}::{$matches[1]}", $attributes)."\n@endComponentClass##END-COMPONENT-CLASS##";
        }, $value);
    }

    /**
     * Compile the closing tags within the given string.
     *
     * @return string
     */
    protected function compileClosingTags(string $value): array|string|null
    {
        $escapedUIPrefix = preg_quote($this->prefix, '/');

        return preg_replace("/<\/\s*{$escapedUIPrefix}[\:][\w\-\:\.]*\s*>/", ' @endComponentClass##END-COMPONENT-CLASS##', $value);
    }
}
