module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  brackerSpacing: true,
  arrowParens: 'avoid',
  proseWrap: 'always',
  trailingComma: 'all',
  printWidth: 100,
  tabWidth: 2,
  tailwindConfig: './tailwind.config.cjs',
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: [require('prettier-plugin-prisma'), require('prettier-plugin-tailwindcss')],
}
