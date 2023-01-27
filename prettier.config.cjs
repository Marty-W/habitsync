module.exports = {
    semi: false,
    singleQuote: true,
    jsxSingleQuote: true,
    bracketSpacing: true,
    arrowParens: 'avoid',
    proseWrap: 'always',
    trailingComma: 'all',
    printWidth: 100,
    tabWidth: 4,
    tailwindConfig: './tailwind.config.cjs',
    plugins: [require('prettier-plugin-prisma'), require('prettier-plugin-tailwindcss')],
}
