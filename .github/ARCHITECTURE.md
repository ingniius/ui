
# Veehance UI Monorepo 🌀

## Directory Structure

```js
├── build
│   ├── manifest.json
│   ├── ui.css
│   ├── ui.js
│   ├── ui.min.js
│   └── ui.mjs
├── config
│   └── ui.php
├── packages
│   └── alpine
│       ├── src
│       │   └── index.ts
│       ├── build.config.ts
│       ├── CHANGELOG.md
│       ├── eslint.config.mjs
│       ├── LICENSE
│       ├── package.json
│       ├── README.md
│       └── tsconfig.json
├── src
│   ├── Commands
│   │   └── PublishCommand.php
│   ├── AssetManager.php
│   ├── ClassBuilder.php
│   ├── functions.php
│   ├── UI.php
│   ├── UIManager.php
│   ├── UIServiceProvider.php
│   └── UITagCompiler.php
├── stubs
│   └── resources
│       └── views
│           └── ui
│               ├── container
│               ├── icon
│               ├── link
│               └── main
│
├── tests
│   └── Unit
│       └── ClassBuilder.php
├── turbo
│   ├── generators
│   │   ├── package
│   │   │   ├── build.config.ts.hbs
│   │   │   ├── eslint.config.mjs.hbs
│   │   │   ├── generator.ts
│   │   │   ├── package.json.hbs
│   │   │   └── tsconfig.json.hbs
│   │   └── config.ts
│   └── tools
│       ├── eslint
│       │   ├── src
│       │   │   └── base.mjs
│       │   ├── CHANGELOG.md
│       │   ├── LICENSE
│       │   ├── package.json
│       │   └── README.md
│       ├── prettier
│       │   ├── src
│       │   │   ├── base.mjs
│       │   │   └── blade.mjs
│       │   ├── CHANGELOG.md
│       │   ├── LICENSE
│       │   ├── package.json
│       │   └── README.md
│       └── tsc
│           ├── src
│           │   └── base.json
│           ├── CHANGELOG.md
│           ├── LICENSE
│           ├── package.json
│           └── README.md
├── CHANGELOG.md
├── composer.json
├── esbuild.config.mjs
├── LICENSE
├── Makefile
├── package.json
├── phpstan-baseline.neon
├── phpstan.neon.dist
├── phpunit.xml.dist
├── pint.json
├── pnpm-workspace.yaml
├── README.md
└── turbo.json

23 directories, 63 files
```
