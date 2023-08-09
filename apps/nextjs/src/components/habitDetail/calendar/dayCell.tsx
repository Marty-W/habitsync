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
	| 'default'

const dayCellVariants = cva(
	'flex h-10 w-10 items-center justify-center rounded-full text-md select-none',
	{
		variants: {
			variant: {
				default: 'text-muted-foreground',
				notThisMonth: 'text-blue-50',
				notThisMonthWithTimestamp: 'text-blue-200',
				withTimestamp: 'bg-tremor-brand text-blue-50',
				extraStreakDay: 'bg-tremor-muted',
				today: 'ring-4',
				todayWithTimestamp: 'ring-2 bg-tremor-brand text-foreground',
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
		}
	}

	if (
		variant === 'default' ||
		variant === 'notThisMonth' ||
		variant === 'today'
	) {
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
				<TooltipContent>{getTooltipContent(variant)}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default DayCell
