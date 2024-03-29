import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'

import baseConfig from '@habitsync/tailwind-config'

export default {
	presets: [baseConfig],
	content: [
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Tremor module
		'../../node_modules/@tremor/**/*.{js,ts,jsx,tsx}',
	],
	plugins: [require('tailwindcss-animate'), require('@headlessui/tailwindcss')],
	darkMode: ['class'],
	theme: {
		transparent: 'transparent',
		current: 'currentColor',
		container: {
			center: true,
			padding: {
				DEFAULT: '1.5rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
		},
		extend: {
			colors: {
				tremor: {
					brand: {
						faint: '#eff6ff', // blue-50
						muted: '#bfdbfe', // blue-200
						subtle: '#60a5fa', // blue-400
						DEFAULT: '#3b82f6', // blue-500
						emphasis: '#1d4ed8', // blue-700
						inverted: '#ffffff', // white
					},
					background: {
						muted: '#f9fafb', // gray-50
						subtle: '#f3f4f6', // gray-100
						DEFAULT: '#ffffff', // white
						emphasis: '#374151', // gray-700
					},
					border: {
						DEFAULT: '#e5e7eb', // gray-200
					},
					ring: {
						DEFAULT: '#e5e7eb', // gray-200
					},
					content: {
						subtle: '#9ca3af', // gray-400
						DEFAULT: '#6b7280', // gray-500
						emphasis: '#374151', // gray-700
						strong: '#111827', // gray-900
						inverted: '#ffffff', // white
					},
				},
				'dark-tremor': {
					brand: {
						faint: '#0B1229', // custom
						muted: '#172554', // blue-950
						subtle: '#1e40af', // blue-800
						DEFAULT: '#3b82f6', // blue-500
						emphasis: '#60a5fa', // blue-400
						inverted: '#030712', // gray-950
					},
					background: {
						muted: '#131A2B', // custom
						subtle: '#1f2937', // gray-800
						DEFAULT: '#111827', // gray-900
						emphasis: '#d1d5db', // gray-300
					},
					border: {
						DEFAULT: '#1f2937', // gray-800
					},
					ring: {
						DEFAULT: '#1f2937', // gray-800
					},
					content: {
						subtle: '#4b5563', // gray-600
						DEFAULT: '#6b7280', // gray-600
						emphasis: '#e5e7eb', // gray-200
						strong: '#f9fafb', // gray-50
						inverted: '#000000', // black
					},
				},
				sborder: 'hsl(var(--sborder))',
				sinput: 'hsl(var(--sinput))',
				sring: 'hsl(var(--sring))',
				sbackground: 'hsl(var(--sbackground))',
				sforeground: 'hsl(var(--sforeground))',
				sprimary: {
					DEFAULT: 'hsl(var(--sprimary))',
					foreground: 'hsl(var(--sprimary-foreground))',
				},
				ssecondary: {
					DEFAULT: 'hsl(var(--ssecondary))',
					foreground: 'hsl(var(--ssecondary-foreground))',
				},
				sdestructive: {
					DEFAULT: 'hsl(var(--sdestructive))',
					foreground: 'hsl(var(--sdestructive-foreground))',
				},
				smuted: {
					DEFAULT: 'hsl(var(--smuted))',
					foreground: 'hsl(var(--smuted-foreground))',
				},
				saccent: {
					DEFAULT: 'hsl(var(--saccent))',
					foreground: 'hsl(var(--saccent-foreground))',
				},
				spopover: {
					DEFAULT: 'hsl(var(--spopover))',
					foreground: 'hsl(var(--spopover-foreground))',
				},
				scard: {
					DEFAULT: 'hsl(var(--scard))',
					foreground: 'hsl(var(--scard-foreground))',
				},
			},
			boxShadow: {
				// light
				'tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				'tremor-card':
					'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				'tremor-dropdown':
					'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
				// dark
				'dark-tremor-input': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
				'dark-tremor-card':
					'0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
				'dark-tremor-dropdown':
					'0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
			},
			borderRadius: {
				'tremor-small': '0.375rem',
				'tremor-default': '0.5rem',
				'tremor-full': '9999px',
			},
			fontSize: {
				'tremor-label': ['0.75rem'],
				'tremor-default': ['0.875rem', { lineHeight: '1.25rem' }],
				'tremor-title': ['1.125rem', { lineHeight: '1.75rem' }],
				'tremor-metric': ['1.875rem', { lineHeight: '2.25rem' }],
			},
			fontFamily: {
				sans: ['var(--font-sans)', ...fontFamily.sans],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'fade-in': {
					'0%': { opacity: '0.5' },
					'100%': { opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 1s ease-in',
			},
			gridTemplateColumns: {
				'14': 'repeat(14, minmax(0, 1fr))',
			},
		},
	},
	safelist: [
		{
			pattern:
				/^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected'],
		},
		{
			pattern:
				/^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected'],
		},
		{
			pattern:
				/^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
			variants: ['hover', 'ui-selected'],
		},
		{
			pattern:
				/^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
		{
			pattern:
				/^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
		{
			pattern:
				/^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
		},
	],
} satisfies Config
