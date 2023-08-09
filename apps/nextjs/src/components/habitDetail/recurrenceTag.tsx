import { Badge } from '@tremor/react'
import { CalendarClock } from 'lucide-react'

import type { RecurrenceType } from '@habitsync/db'

interface Props {
	type: RecurrenceType
	step: number | null
	days: string[]
}
const RecurrenceTag = ({ type, step, days }: Props) => {
	const getBadgeContent = () => {
		switch (type) {
			case 'every_workday':
				return 'Every workday'
			case 'every_x_days':
				return `Every ${step} days`
			case 'specific_days':
				return `Every ${days?.join(', ')}`
			case 'every_day':
				return 'Every day'
			default:
				return ''
		}
	}
	const badgeContent = getBadgeContent()

	return (
		<Badge size="lg" className="flex py-1" icon={CalendarClock}>
			{badgeContent}
		</Badge>
	)
}

export default RecurrenceTag
