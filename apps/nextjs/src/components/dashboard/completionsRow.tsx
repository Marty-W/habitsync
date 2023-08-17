import { isBefore, startOfDay } from 'date-fns'

import type { RouterOutputs } from '@habitsync/api'
import { normalizeDate } from '@habitsync/lib'

import usePills from '~/hooks/usePills'
import DayCompletionStatus from './dayCompletionStatus'

interface Props {
	timestampData: RouterOutputs['timestamp']['getAllWithStreakDays']
	habitDetail: RouterOutputs['habit']['getDetail']
}

const CompletionsRow = ({ timestampData, habitDetail }: Props) => {
	const { ref, pills } = usePills()

	if (timestampData.timestamps.size === 0) {
		return <span className="text-smuted-foreground">No completions yet</span>
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
