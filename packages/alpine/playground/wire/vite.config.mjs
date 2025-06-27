import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.mjs'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        host: process.env.HOST,
        port: process.env.PORT,
        cors: true,
    },
    watch: {
        ignored: ['**/node_modules/**', '**/vendor/**'],
    },
});
