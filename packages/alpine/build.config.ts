import { globbySync } from 'globby';
import { defineBuildConfig } from 'unbuild';

import { peerDependencies } from './package.json';

export default defineBuildConfig({
    clean: true,
    declaration: true,
    entries: globbySync(['src/**/*.ts']),
    externals: [...Object.keys(peerDependencies || {})].map(name => new RegExp(`^${name}(/.*)?`)),
});
