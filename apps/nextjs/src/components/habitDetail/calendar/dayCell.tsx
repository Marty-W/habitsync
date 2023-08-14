import { cva } from 'class-variance-authority'

import { cn } from '~/utils/tailwind'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '~/components/ui/tooltip'

export type DayCellVariant =
	| 'notThisMonth'
	| 'notThisMonthWithTimestamp'
	| 'withTimestamp'
	| 'extraStreakDay'
	| 'today'
	| 'todayWithTimestamp'
	| 'startDay'
	| 'default'

const dayCellVariants = cva(
	'flex h-10 w-10 items-center justify-center rounded-full text-md select-none',
	{
		variants: {
			variant: {
				default: 'text-sforeground',
				notThisMonth: 'text-smuted-foreground/50',
				notThisMonthWithTimestamp: 'text-blue-400/30',
				withTimestamp: 'bg-tremor-brand text-blue-50',
				extraStreakDay: 'bg-green-200',
				today: 'ring-4',
				todayWithTimestamp: 'ring-2 bg-tremor-brand text-blue-50',
				startDay: 'ring-4 ring-green-200',
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
			case 'withTimestamp':
			case 'notThisMonthWithTimestamp':
			case 'todayWithTimestamp':
				return 'Successful day!'
			case 'extraStreakDay':
				return 'You have a streak going!'
			case 'startDay':
				return 'You started this habit!'
			case 'today':
				return 'Today'
		}
	}

	if (variant === 'default' || variant === 'notThisMonth') {
		return (
			<div className={cn(dayCellVariants({ variant }))}>
				<span>{date.getDate()}</span>
			</div>
		)
	}

	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger>
					<div className={cn(dayCellVariants({ variant }))}>
						<span>{date.getDate()}</span>
					</div>
				</TooltipTrigger>
				<TooltipContent className="text-slate-50">
					{getTooltipContent(variant)}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default DayCell
