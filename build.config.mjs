import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sync } from 'brotli-size';
import { build } from 'esbuild';

const __dirname = dirname(fileURLToPath(import.meta.url));

// 1. Module
await build({ bundle: true, entryPoints: ['js/index.mjs'], format: 'esm', outfile: 'dist/ui.mjs' });
outputSize('dist/ui.mjs');

// 2. CDN
await build({ bundle: true, entryPoints: ['js/index.mjs'], outfile: 'dist/ui.js' });
outputSize('dist/ui.js');

// 3. Minified CDN
await build({ bundle: true, entryPoints: ['js/index.mjs'], minify: true, outfile: 'dist/ui.min.js' });
outputSize('dist/ui.min.js');

// 4. Manifest
let content = readFileSync(join(__dirname, 'dist', 'ui.mjs'));
let hash = createHash('md5').update(content).digest('hex').slice(0, 8);
let manifest = { '/ui.js': hash };

content = readFileSync(join(__dirname, 'dist', 'ui.css'));
hash = createHash('md5').update(content).digest('hex').slice(0, 8);
manifest['/ui.css'] = hash;

writeFileSync(join(__dirname, 'dist', 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log('\x1b[32m', '\n');
console.log('\x1b[32m', 'Build complete and manifest generated');

// 5. HELPERS
function outputSize(file) {
    const size = bytesToSize(sync(readFileSync(file)));
    console.log('\x1b[32m', `Bundle size (${file}): ${size}`);
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return 'n/a';

    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    if (i === 0) return `${bytes} ${sizes[i]}`;

    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
}
