import type { Resolver } from '@nuxt/kit';
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema';

import { addTemplate, addTypeTemplate, hasNuxtModule } from '@nuxt/kit';
import { isFunction } from 'es-toolkit';
import { genExport } from 'knitwork';
import { fileURLToPath } from 'node:url';
import { kebabCase } from 'scule';

import type { ModuleOptions } from './module';

import { normalizeColors } from './colors';
import * as theme from './theme';

export function addTemplates(options: ModuleOptions, nuxt: Nuxt, { resolve, runtimeDir }: { resolve: Resolver['resolve']; runtimeDir: string }) {
    const templates = getTemplates(options, nuxt.options.appConfig.ui);

    for (const template of templates) {
        if (template.filename!.endsWith('.d.ts')) {
            addTypeTemplate(template as NuxtTypeTemplate);
        } else {
            addTemplate(template);
        }
    }

    nuxt.hook('prepare:types', ({ references }) => {
        references.push({ path: resolve(runtimeDir, 'types/app.config.d.ts') });
    });
}

export function getTemplates(options: ModuleOptions, uiConfig: Record<string, any>) {
    const templates: NuxtTemplate[] = [];

    for (const component in theme.ui) {
        templates.push({
            filename: `ui/${kebabCase(component)}.ts`,
            write: true,
            getContents: async () => await writeTemplate(theme.ui, component, options, 'theme/ui'),
        });
    }

    if (hasNuxtModule('@nuxtjs/color-mode') || options.colorMode) {
        for (const component in theme.colorMode) {
            templates.push({
                filename: `ui/color-mode/${kebabCase(component)}.ts`,
                write: true,
                getContents: async () => await writeTemplate(theme.colorMode, component, options, 'theme/color-mode'),
            });
        }

        templates.push({
            filename: 'ui/color-mode/index.ts',
            write: true,
            getContents: () => Object.keys(theme.prose).sort().map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n'),
        });
    }

    if (hasNuxtModule('@nuxtjs/mdc') || options.mdc) {
        for (const component in theme.prose) {
            templates.push({
                filename: `ui/prose/${kebabCase(component)}.ts`,
                write: true,
                getContents: async () => await writeTemplate(theme.prose, component, options, 'theme/prose'),
            });
        }

        templates.push({
            filename: 'ui/prose/index.ts',
            write: true,
            getContents: () => Object.keys(theme.prose).sort().map(component => `export { default as ${component} } from './${kebabCase(component)}'`).join('\n'),
        });
    }

    templates.push({
        filename: 'ui/index.ts',
        write: true,
        getContents: () => {
            const imports = [];

            if (hasNuxtModule('@nuxtjs/color-mode') || options.colorMode) {
                imports.push('export * as colorMode from \'./color-mode\'');
            }

            if (hasNuxtModule('@nuxtjs/mdc') || options.mdc) {
                imports.push('export * as prose from \'./prose\'');
            }

            imports.push(...Object.keys(theme.ui).sort().map(component => `export { default as ${component} } from './${kebabCase(component)}'`));
            return imports.join('\n').trim();
        },
    });

    templates.push({
        filename: 'types/ui.d.ts',
        getContents: () => `import type { Color, Icons, Iconset, NeutralColor } from '#ui/types'
import type { defaultConfig } from 'tailwind-variants'

const icons = ${JSON.stringify(uiConfig.icons)};

declare module '@nuxt/schema' {
    interface AppConfigInput {
        ui?: {
            colors?: {
                ${options?.colors?.map(color => `'${color}'?: Color`).join('\n\t\t')}
                'neutral'?: NeutralColor
            }
            icons?: Icons<typeof icons>
            iconset?: Iconset
            tv?: typeof defaultConfig
        }
    }
}

export {}
  `,
    });

    templates.push({ filename: 'ui.css', write: true, getContents: () => normalizeColors(options) });
    templates.push({
        filename: 'ui-image.ts',
        write: true,
        getContents: ({ app }) => {
            const image = app?.components?.find(c => c.pascalName === 'NuxtImg' && !/nuxt(?:-nightly)?\/dist\/app/.test(c.filePath));
            return image ? genExport(image.filePath, [{ name: image.export, as: 'default' }]) : 'export default "img"';
        },
    });

    return templates;
}

async function writeTemplate(theme: Record<string, any>, component: string, options: Record<string, any> = {}, sourcePath: string) {
    const template = (theme as any)[component];
    const result = isFunction(template) ? template(options) : template;

    const variants = Object.entries(result.variants || {})
        .filter(([_, values]) => {
            const keys = Object.keys(values as Record<string, unknown>);
            return keys.some(key => key !== 'true' && key !== 'false');
        })
        .map(([key]) => key);

    let json = JSON.stringify(result, null, 2);
    for (const variant of variants) {
        json = json.replace(new RegExp(`("${variant}": "[^"]+")`, 'g'), `$1 as typeof ${variant}[number]`);
        json = json.replace(new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, 'g'), (_, before, match, after) => {
            const replaced = match.replace(/("[^"]+")/g, `$1 as typeof ${variant}[number]`);
            return `${before}${replaced}${after}`;
        });
    }

    function generateVariantDeclarations(variants: string[]) {
        return variants.map((variant) => {
            const keys = Object.keys(result.variants[variant]);
            return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`;
        });
    }

    if (process.argv.includes('--uiDev')) {
        const templatePath = fileURLToPath(new URL(`./${sourcePath}/${kebabCase(component)}`, import.meta.url));
        return [
            `import template from ${JSON.stringify(templatePath)}`,
            ...generateVariantDeclarations(variants),
            `const result = typeof template === 'function' ? (template as Function)(${JSON.stringify(options, null, 2)}) : template`,
            `const theme = ${json}`,
            `export default result as typeof theme`,
        ].join('\n\n');
    }

    return [
        ...generateVariantDeclarations(variants),
        `export default ${json}`,
    ].join('\n\n');
}
