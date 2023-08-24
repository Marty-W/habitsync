import { cva } from 'class-variance-authority'

import { cn } from '~/utils/tailwind'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/components/ui/tooltip'
import type { DayCellVariant } from './dayCell'

export type DayCellWithTooltipVariant =
	| 'notThisMonth'
	| 'withTimestamp'
	| 'extraStreakDay'
	| 'default'

const dayCellVariants = cva(
	'flex h-10 w-10 items-center justify-center rounded-full p-4 text-md select-none',
	{
		variants: {
			variant: {
				default: 'text-smuted-foreground',
				today: 'ring ring-red-400 ring-offset-4',
				notThisMonth: 'text-smuted-foreground/10',
				notThisMonthWithTimestamp: 'text-saccent/80',
				withTimestamp: 'bg-saccent text-sforeground',
				extraStreakDay: 'bg-saccent/30',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
)

interface Props {
	date: Date
	variant?: DayCellVariant
}

const DayCell = ({ date, variant = 'default' }: Props) => {
	const getTooltipContent = (variant: DayCellVariant) => {
		switch (variant) {
			case 'withTimestamp' || 'notThisMonthWithTimestamp':
				return 'Successful day!'
			case 'extraStreakDay':
				return 'You have a streak going!'
			default:
				return 'Failure day'
		}
	}

	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger>
					<div className={cn(dayCellVariants({ variant }))}>
						<span>{date.getDate()}</span>
					</div>
				</TooltipTrigger>
				<TooltipContent>{getTooltipContent(variant)}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default DayCell
