import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '~/utils/tailwind'

const pillVariants = cva('mx-1 h-7 w-[10px] rounded-lg', {
	variants: {
		variant: {
			success: 'bg-green-500',
			failure: 'bg-red-400',
			blank: 'bg-gray-700',
			extraStreakDay: 'bg-green-200',
		},
	},
})

interface Props
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof pillVariants> {}

const Pill = ({ variant, className }: Props) => {
	console.log(variant)
	return <div className={cn(pillVariants({ variant, className }))} />
}

export default Pill
