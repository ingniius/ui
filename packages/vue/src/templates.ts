import type { Resolver } from '@nuxt/kit';
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from '@nuxt/schema';

import { addTemplate, addTypeTemplate } from '@nuxt/kit';
import { genExport } from 'knitwork';

import type { ModuleOptions } from './module';

import { normalizeColors } from './colors';

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

    templates.push({
        filename: 'types/ui.d.ts',
        getContents: () => `import type { defaultConfig } from 'tailwind-variants'
import colors from 'tailwindcss/colors'

const icons = ${JSON.stringify(uiConfig.icons)};

type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | (string & {})
type Color = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor> | (string & {})

type AppConfigUI = {
  colors?: {
    ${options.theme?.colors?.map(color => `'${color}'?: Color`).join('\n\t\t')}
    neutral?: NeutralColor
  }
  icons?: Partial<typeof icons> & Record<string, string>
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: AppConfigUI
  }
}

export {}
  `,
    });

    templates.push({ filename: 'ui.css', write: true, getContents: () => normalizeColors(options) });

    templates.push({
        filename: 'ui-image-component.ts',
        write: true,
        getContents: ({ app }) => {
            const image = app?.components?.find(c => c.pascalName === 'NuxtImg' && !/nuxt(?:-nightly)?\/dist\/app/.test(c.filePath));
            return image ? genExport(image.filePath, [{ name: image.export, as: 'default' }]) : 'export default "img"';
        },
    });

    return templates;
}
