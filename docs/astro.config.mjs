import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';

export default defineConfig({
    integrations: [
        starlight({
            title: 'Veehance UI',
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ingniius/ui' }],
            sidebar: [
                {
                    label: 'Guides',
                    items: [{ label: 'Example Guide', slug: 'guides/example' }],
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
            ],
        }),
    ],
    server: ({ command }) => ({ port: command === 'dev' ? 3000 : 4000, host: true }),
});
