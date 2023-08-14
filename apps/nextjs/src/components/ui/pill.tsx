import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '~/utils/tailwind'

const pillVariants = cva('mx-1 h-7 w-[10px] rounded-lg', {
	variants: {
		variant: {
			success: 'bg-green-400',
			failure: 'bg-red-400',
			blank: 'bg-gray-500',
			extraStreakDay: 'bg-lime-200',
		},
	},
})

interface Props
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof pillVariants> {}

const Pill = ({ variant, className }: Props) => {
	return <div className={cn(pillVariants({ variant, className }))} />
}

export default Pill
