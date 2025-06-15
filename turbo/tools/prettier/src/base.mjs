/** @type {import("prettier").Config} */
export default {
    arrowParens: 'always',
    overrides: [
        { files: '*.json.hbs', options: { parser: 'json' } },
        { files: '*.mjs.hbs', options: { parser: 'babel' } },
        { files: '*.ts.hbs', options: { parser: 'typescript' } },
    ],
    plugins: ['prettier-plugin-tailwindcss'],
    printWidth: 120,
    proseWrap: 'always',
    quoteProps: 'consistent',
    semi: true,
    singleQuote: true,
    tabWidth: 4,
    trailingComma: 'es5',
    useTabs: false,
};
