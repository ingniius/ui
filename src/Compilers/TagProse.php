<?php

declare(strict_types=1);

namespace Vee\Compilers;

use Illuminate\View\Compilers\ComponentTagCompiler;
use InvalidArgumentException;

final class TagProse extends ComponentTagCompiler
{
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
        $prosePrefix = useProse();
        $escapedProsePrefix = preg_quote($prosePrefix, '/');

        $pattern = "/
            <
                \s*
                {$escapedProsePrefix}[\:]([\w\-\:\.]*)
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

        return preg_replace_callback($pattern, function (array $matches) use ($prosePrefix) {
            $this->boundAttributes = [];

            $attributes = $this->getAttributesFromAttributeString($matches['attributes']);

            return $this->componentString("{$prosePrefix}::{$matches[1]}", $attributes);
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
        $prosePrefix = useProse();
        $escapedProsePrefix = preg_quote($prosePrefix, '/');

        $pattern = "/
            <
                \s*
                {$escapedProsePrefix}[\:]([\w\-\:\.]*)
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

        return preg_replace_callback($pattern, function (array $matches) use ($prosePrefix) {
            $this->boundAttributes = [];

            $attributes = $this->getAttributesFromAttributeString($matches['attributes']);

            // Support inline "slot" attributes...
            if (isset($attributes['slot'])) {
                $slot = $attributes['slot'];

                unset($attributes['slot']);

                return '@slot('.$slot.') '.$this->componentString("{$prosePrefix}::{$matches[1]}", $attributes)."\n@endComponentClass##END-COMPONENT-CLASS##".' @endslot';
            }

            return $this->componentString("{$prosePrefix}::{$matches[1]}", $attributes)."\n@endComponentClass##END-COMPONENT-CLASS##";
        }, $value);
    }

    /**
     * Compile the closing tags within the given string.
     *
     * @return string
     */
    protected function compileClosingTags(string $value): array|string|null
    {
        $prosePrefix = useProse();
        $escapedProsePrefix = preg_quote($prosePrefix, '/');

        return preg_replace("/<\/\s*{$escapedProsePrefix}[\:][\w\-\:\.]*\s*>/", ' @endComponentClass##END-COMPONENT-CLASS##', $value);
    }
}
