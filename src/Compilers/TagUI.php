<?php

declare(strict_types=1);

namespace Vee\Compilers;

use Illuminate\View\Compilers\ComponentTagCompiler;
use InvalidArgumentException;

final class TagUI extends ComponentTagCompiler
{
    public function componentString(string $component, array $attributes): string
    {
        $uiPrefix = useUI();

        // A component that forwards all data, attributes, and named slots to another component...
        if ($component === "{$uiPrefix}::delegate-component") {
            $component = $attributes['component'];

            $class = \Illuminate\View\AnonymousComponent::class;

            // Laravel 12+ uses xxh128 hashing for views https://github.com/laravel/framework/pull/52301...
            return "<?php if (!UI::componentExists(\$name = {$component})) throw new \Exception(\"UI component [{\$name}] does not exist.\"); ?>##BEGIN-COMPONENT-CLASS##@component('{$class}', '{$uiPrefix}::' . {$component}, [
    'view' => (app()->version() >= 12 ? hash('xxh128', '{$uiPrefix}') : md5('{$uiPrefix}')) . '::' . {$component},
    'data' => \$__env->getCurrentComponentData(),
])
<?php \$component->withAttributes(\$attributes->getAttributes()); ?>";
        }

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
        $uiPrefix = useUI();
        $escapedUIPrefix = preg_quote($uiPrefix, '/');

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

        return preg_replace_callback($pattern, function (array $matches) use ($uiPrefix) {
            $this->boundAttributes = [];

            $attributes = $this->getAttributesFromAttributeString($matches['attributes']);

            return $this->componentString("{$uiPrefix}::{$matches[1]}", $attributes);
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
        $uiPrefix = useUI();
        $escapedUIPrefix = preg_quote($uiPrefix, '/');

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

        return preg_replace_callback($pattern, function (array $matches) use ($uiPrefix) {
            $this->boundAttributes = [];

            $attributes = $this->getAttributesFromAttributeString($matches['attributes']);

            // Support inline "slot" attributes...
            if (isset($attributes['slot'])) {
                $slot = $attributes['slot'];

                unset($attributes['slot']);

                return '@slot('.$slot.') '.$this->componentString("{$uiPrefix}::{$matches[1]}", $attributes)."\n@endComponentClass##END-COMPONENT-CLASS##".' @endslot';
            }

            return $this->componentString("{$uiPrefix}::{$matches[1]}", $attributes)."\n@endComponentClass##END-COMPONENT-CLASS##";
        }, $value);
    }

    /**
     * Compile the closing tags within the given string.
     *
     * @return string
     */
    protected function compileClosingTags(string $value): array|string|null
    {
        $uiPrefix = useUI();
        $escapedUIPrefix = preg_quote($uiPrefix, '/');

        return preg_replace("/<\/\s*{$escapedUIPrefix}[\:][\w\-\:\.]*\s*>/", ' @endComponentClass##END-COMPONENT-CLASS##', $value);
    }
}
