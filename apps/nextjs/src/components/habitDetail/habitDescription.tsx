import { Badge, Card } from '@tremor/react'

import type { RouterOutputs } from '~/utils/trpc'
import RecurrenceTag from './recurrenceTag'

interface Props {
	desc: RouterOutputs['habit']['getDetail']
}

const HabitDescription = ({ desc }: Props) => (
	<Card>
		<div className="p-2">
			<p className="text-card-foreground flex-1 text-2xl">{desc.description}</p>
		</div>
		<div className="text-card-foreground/40 p-2">
			<RecurrenceTag
				type={desc.recurrenceType}
				step={desc.recurrenceStep}
				days={desc.recurrenceDays}
			/>
		</div>
		<div className="p-2">
			{desc.labels.map((label) => {
				return (
					<Badge key={label} size="xs" color="emerald" className="mr-1">
						{label}
					</Badge>
				)
			})}
		</div>
	</Card>
)

export default HabitDescription
