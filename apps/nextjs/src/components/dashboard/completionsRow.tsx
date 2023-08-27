import { isBefore, startOfDay } from 'date-fns'
import { CalendarX } from 'lucide-react'

import type { RouterOutputs } from '@habitsync/api'
import { normalizeDate } from '@habitsync/lib'

import usePills from '~/hooks/usePills'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '../ui/tooltip'
import DayCompletionStatus from './dayCompletionStatus'

interface Props {
	timestampData: RouterOutputs['timestamp']['getAllWithStreakDays']
	habitDetail: RouterOutputs['habit']['getDetail']
}

const CompletionsRow = ({ timestampData, habitDetail }: Props) => {
	const { ref, pills } = usePills()

	if (timestampData.timestamps.size === 0) {
		return (
			<TooltipProvider delayDuration={200}>
				<Tooltip>
					<TooltipTrigger>
						<CalendarX size={20} className="text-smuted-foreground" />
					</TooltipTrigger>
					<TooltipContent>You have no data on this habit yet.</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		)
	}
	return (
		<div className="flex flex-1 justify-end" ref={ref}>
			{pills.map((day, index) => {
				return (
					<DayCompletionStatus
						key={index}
						date={day}
						isSuccessful={timestampData.timestamps.has(normalizeDate(day))}
						isExtraStreakDay={
							timestampData.extraStreakDays?.has(normalizeDate(day)) ?? false
						}
						isBlank={isBefore(day, startOfDay(habitDetail.createdAt))}
					/>
				)
			})}
		</div>
	)
}

export default CompletionsRow
