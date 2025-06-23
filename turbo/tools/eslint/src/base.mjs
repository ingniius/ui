import antfu from '@antfu/eslint-config';
import turbo from 'eslint-config-turbo/flat';

export const config = {
    type: 'lib',
    formatters: {
        css: true,
        html: true,
        markdown: 'prettier',
    },
    stylistic: {
        indent: 4,
        semi: true,
        quotes: 'single',
    },
    typescript: {
        overrides: {
            'ts/explicit-function-return-type': 'off',
        },
    },
    yml: true,
};

export const rules = {
    'node/prefer-global/process': 'off',
    'perfectionist/sort-imports': ['error', { tsconfigRootDir: '.' }],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
};

/** @type {Awaited<import('@antfu/eslint-config').TypedFlatConfigItem[]>} */
export default (options) => antfu(config, { rules }, ...turbo, ...options);
