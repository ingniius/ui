<?php

declare(strict_types=1);

namespace Vee\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Symfony\Component\Console\Attribute\AsCommand;

use function Laravel\Prompts\confirm;
use function Laravel\Prompts\info;
use function Laravel\Prompts\intro;
use function Laravel\Prompts\text;

#[AsCommand(name: 'vee:icon')]
final class IconCommand extends Command
{
    protected $signature = 'vee:icon {icons?*}';

    protected $description = 'Import third-party icons from Iconify.';

    public function handle(): void
    {
        if (count($icons = $this->argument('icons')) > 0) {
            foreach ($icons as $icon) {
                $this->publishIcon($icon);
            }

            return;
        }

        intro('Access over 200,000+ icons from Iconify');
        info('Search for the perfect icon at: https://iconify.design');

        prompt:

        $icon = text(
            label: 'Which icon would you like to create?',
            required: 'An icon name is required.',
            placeholder: 'e.g. arrow-left',
        );

        $this->publishIcon($icon);

        if (confirm('Would you like to import another icon?')) {
            goto prompt;
        }
    }

    protected function publishIcon(string $icon): void
    {
        (new Filesystem)->ensureDirectoryExists(resource_path('views/ui/icon'));

        $iconName = str_contains($icon, ':') ? explode(':', $icon, 2)[1] : $icon;
        $destinationAsFile = resource_path("views/ui/icon/{$iconName}.blade.php");

        file_put_contents($destinationAsFile, $this->generateIconBlade($icon));

        info("Published icon: {$destinationAsFile}");
    }

    protected function generateIconBlade($icon)
    {
        $stub = <<<'HTML'
        @props([
            'variant' => null,
        ])

        <vee:icon icon="$iconName" :$variant />
        HTML;

        // Replace $iconName with the actual value
        return str_replace('$iconName', "{$icon}", $stub);
    }
}
