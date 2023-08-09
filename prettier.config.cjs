/** @typedef  {import("prettier").Config} PrettierConfig */
/** @typedef {import("prettier-plugin-tailwindcss").PluginOptions} TailwindConfig */
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */

/** @type { PrettierConfig | SortImportsConfig | TailwindConfig } */
const config = {
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],
	tailwindConfig: './packages/config/tailwind',
	importOrder: [
		'^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
		'^(next/(.*)$)|^(next$)',
		'^(expo(.*)$)|^(expo$)',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@habitsync/(.*)$',
		'',
		'^~/utils/(.*)$',
		'^~/components/(.*)$',
		'^~/styles/(.*)$',
		'^~/(.*)$',
		'^[./]',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
	importOrderTypeScriptVersion: '4.4.0',
	semi: false,
	printWidth: 80,
	useTabs: true,
	singleQuote: true,
	arrowParens: 'always',
}

module.exports = config
