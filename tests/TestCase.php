<?php

declare(strict_types=1);

namespace Tests;

use Orchestra\Testbench\TestCase as BaseTestCase;
use Vee\UIServiceProvider;

abstract class TestCase extends BaseTestCase
{
    protected function getPackageProviders($app)
    {
        return [UIServiceProvider::class];
    }

    protected function getEnvironmentSetUp($app)
    {
        $app['config']->set('ui.colors', ['primary' => 'emerald', 'neutral' => 'neutral']);
    }
}
