import { Badge, Card, Icon } from '@tremor/react'
import { Text } from 'lucide-react'

import type { RouterOutputs } from '~/utils/trpc'
import RecurrenceTag from './recurrenceTag'

interface Props {
	desc: RouterOutputs['habit']['getDetail']
}

const HabitDescription = ({ desc }: Props) => (
	<Card
		className="flex items-center space-x-4 space-y-2 2xl:h-full"
		decoration="top"
	>
		<Icon icon={Text} size="xl" variant="light" />
		<div>
			<div className="p-2">
				<p className="text-scard-foreground flex-1 text-2xl">
					{desc.description}
				</p>
			</div>

			<div>
				<div className="text-scard-foreground/40 p-2">
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
			</div>
		</div>
	</Card>
)

export default HabitDescription
