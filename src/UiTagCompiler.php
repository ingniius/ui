<?php

declare(strict_types=1);

namespace Vee;

use Illuminate\Support\Facades\Config;
use Illuminate\View\Compilers\ComponentTagCompiler;
use InvalidArgumentException;


final class UiTagCompiler extends ComponentTagCompiler
{

    protected ?string $uiPrefix = null;

    /**
     * Get the UI prefix, fetching it from config if not already set.
     */
    protected function getUiPrefix(): string
    {
        if (is_null($this->uiPrefix)) {
            $this->uiPrefix = Config::get('ui.prefix', 'vee');
        }
        return $this->uiPrefix;
    }

    public function componentString(string $component, array $attributes)
    {
        $uiPrefix = $this->getUiPrefix();

        // A component that forwards all data, attributes, and named slots to another component...
        if ($component === "{$uiPrefix}::delegate-component") {
            $component = $attributes['component'];

            $class = \Illuminate\View\AnonymousComponent::class;

            // Laravel 12+ uses xxh128 hashing for views https://github.com/laravel/framework/pull/52301...
            return "<?php if (!Ui::componentExists(\$name = {$component})) throw new \Exception(\"Ui component [{\$name}] does not exist.\"); ?>##BEGIN-COMPONENT-CLASS##@component('{$class}', '{$uiPrefix}::' . {$component}, [
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
    protected function compileOpeningTags(string $value)
    {
        $uiPrefix = $this->getUiPrefix(); // Get prefix for regex
        $escapedUiPrefix = preg_quote($uiPrefix, '/');

        $pattern = "/
            <
                \s*
                {$escapedUiPrefix}[\:]([\w\-\:\.]*)
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
    protected function compileSelfClosingTags(string $value)
    {
        $uiPrefix = $this->getUiPrefix(); // Get prefix for regex
        $escapedUiPrefix = preg_quote($uiPrefix, '/');

        $pattern = "/
            <
                \s*
                {$escapedUiPrefix}[\:]([\w\-\:\.]*)
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
    protected function compileClosingTags(string $value)
    {
        $uiPrefix = $this->getUiPrefix();
        $escapedUiPrefix = preg_quote($uiPrefix, '/');

        return preg_replace("/<\/\s*{$escapedUiPrefix}[\:][\w\-\:\.]*\s*>/", ' @endComponentClass##END-COMPONENT-CLASS##', $value);
    }
}
