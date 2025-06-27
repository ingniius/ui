import { defineBuildConfig } from 'unbuild';

import { peerDependencies } from './package.json';

export default defineBuildConfig({
    clean: true,
    declaration: true,
    entries: [
        { builder: 'mkdist', input: './src/runtime/', outDir: './dist/runtime' },
        './src/bundler.ts',
        './src/module.ts',
        './src/index.ts',
    ],
    externals: [...Object.keys(peerDependencies || {})].map(name => new RegExp(`^${name}(/.*)?`)),
});
