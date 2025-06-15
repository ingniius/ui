import baseConfig from './base.mjs';

/** @type {import("prettier").Config} */
export default {
    ...baseConfig,
    overrides: [...baseConfig.overrides, { files: ['*.blade.php'], options: { parser: 'blade' } }],
    plugins: [...baseConfig.plugins, 'prettier-plugin-blade'],
};
