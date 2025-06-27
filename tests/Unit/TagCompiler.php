<?php

declare(strict_types=1);

use Illuminate\View\Compilers\BladeCompiler;
use Vee\Utils\TagCompiler;

beforeEach(function () {
    $this->bladeCompiler = app(BladeCompiler::class);
    $this->compiler = new TagCompiler(
        prefix: 'vee',
        aliases: $this->bladeCompiler->getClassComponentAliases(),
        namespaces: $this->bladeCompiler->getClassComponentNamespaces(),
        compiler: $this->bladeCompiler
    );
});

it('should compile an opening and closing vee tag', function () {
    $input = '<vee:card variant="solid">Content</vee:card>';
    $compiled = $this->compiler->compile($input);

    expect($compiled)->toContain('@component(');
    expect($compiled)->toContain('vee::card');
    expect($compiled)->toContain('@endComponentClass##END-COMPONENT-CLASS##');
});

it('should compile a self-closing vee tag', function () {
    $input = '<vee:icon name="dark" />';
    $compiled = $this->compiler->compile($input);

    expect($compiled)->toContain('vee::icon');
    expect($compiled)->toContain('@endComponentClass##END-COMPONENT-CLASS##');
});
