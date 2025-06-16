<?php

declare(strict_types=1);

namespace Vee\Commands;

use Illuminate\Console\Command;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Collection;
use Symfony\Component\Console\Attribute\AsCommand;

use function Laravel\Prompts\info;
use function Laravel\Prompts\multisearch;
use function Laravel\Prompts\search;
use function Laravel\Prompts\warning;

#[AsCommand(name: 'vee:publish')]
final class PublishCommand extends Command
{
    protected $signature = 'vee:publish {components?*} {--multiple} {--all} {--force}';

    protected $description = 'Publish individual ui components.';

    protected array $allComponents = [
        'Avatar' => ['avatar'],
        'Card' => ['card'],
        'Container' => ['container'],
        'Icon' => ['icon'],
        'Image' => ['image'],
        'Link' => ['link'],
        'Main' => ['main'],
    ];

    public function handle(): void
    {
        if ($this->option('all')) {
            $componentNames = $this->allComponents()->keys()->all();
        } elseif (count($this->argument('components')) > 0) {
            $componentNames = $this->allComponents()
                ->keys()
                ->filter(fn (string $component) => in_array(str($component)->lower(), array_map('strtolower', $this->argument('components'))))
                ->values()
                ->all();
        } elseif ($this->option('multiple')) {
            $componentNames = multisearch(
                label: 'Which component would you like to publish?',
                options: fn (string $value) => $this->searchOptions($value),
            );
        } else {
            $componentNames = (array) search(
                label: 'Which component would you like to publish?',
                options: fn (string $value) => $this->searchOptions($value),
            );
        }

        (new Filesystem)->ensureDirectoryExists(resource_path('views/ui'));

        $components = $this->allComponents()->intersectByKeys(array_flip($componentNames))->values()->flatten()->unique()->all();

        foreach ($components as $component) {
            $this->publishComponent($component);
        }
    }

    protected function allComponents(): Collection
    {
        return collect($this->allComponents)->sortKeys();
    }

    protected function searchOptions(string $value): array
    {
        if ($value === '') {
            return $this->allComponents()->keys()->toArray();
        }

        return $this->allComponents()
            ->keys()
            ->filter(fn (string $component) => str($component)->lower()->startsWith(str($value)->lower()))
            ->values()
            ->all();
    }

    protected function publishComponent(string $component): void
    {
        $filesystem = new Filesystem;

        $sourceAsDirectory = __DIR__.'/../../stubs/resources/views/ui/'.$component;
        $sourceAsFile = __DIR__.'/../../stubs/resources/views/ui/'.$component.'.blade.php';

        $destinationAsDirectory = resource_path("views/ui/{$component}");
        $destinationAsFile = resource_path("views/ui/{$component}.blade.php");

        $destination = $filesystem->isDirectory($sourceAsDirectory) ? $this->publishDirectory($sourceAsDirectory, $destinationAsDirectory) : null;

        if ($destination) {
            info("Published: {$destination}");
        }

        $destination = $filesystem->isFile($sourceAsFile) ? $this->publishFile($component, $sourceAsFile, $destinationAsFile) : null;

        if ($destination) {
            info("Published: {$destination}");
        }

    }

    protected function publishDirectory($source, $destination): ?string
    {
        $filesystem = new Filesystem;
        $filesystem->copyDirectory($source, $destination);

        return $destination;
    }

    protected function publishFile($component, $source, $destination): ?string
    {
        $filesystem = new Filesystem;

        if ($filesystem->exists($destination) && ! $this->option('force')) {
            warning("Skipping [{$component}]. File already exists: {$destination}");

            return null;
        }

        $filesystem->copy($source, $destination);

        return $destination;
    }
}
