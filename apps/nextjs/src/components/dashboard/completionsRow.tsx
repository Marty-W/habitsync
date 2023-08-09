import { isBefore, startOfDay } from 'date-fns'

import { normalizeDate } from '@habitsync/lib'

import useCompletionPillsData from '~/hooks/useCompletionPillsData'
import usePills from '~/hooks/usePills'
import DayCompletionStatus from './dayCompletionStatus'

interface Props {
	habitId: string
}

const CompletionsRow = ({ habitId }: Props) => {
	const { ref, pills } = usePills()
	const { timestamps, habitDetail } = useCompletionPillsData({ habitId })

	if (timestamps.isLoading || habitDetail.isLoading) {
		return null
	}

	if (timestamps.error ?? habitDetail.error) {
		return (
			<span className="text-muted-foreground">
				There was an error fetching your completions.
			</span>
		)
	}

	if (timestamps.data.timestamps.size === 0) {
		return <span className="text-muted-foreground">No completions yet</span>
	}

	return (
		<div className="flex flex-1 justify-end" ref={ref}>
			{pills.map((day, index) => {
				return (
					<DayCompletionStatus
						key={index}
						date={day}
						isSuccessful={timestamps.data.timestamps.has(normalizeDate(day))}
						isExtraStreakDay={
							timestamps.data.extraStreakDays
								? timestamps.data.extraStreakDays.has(normalizeDate(day))
								: false
						}
						isBlank={isBefore(day, startOfDay(habitDetail.data.createdAt))}
					/>
				)
			})}
		</div>
	)
}

export default CompletionsRow
