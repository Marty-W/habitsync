import { Badge, Card, Icon } from '@tremor/react'
import { Text } from 'lucide-react'

import { api } from '~/utils/trpc'
import DetailError from './detailError'
import RecurrenceTag from './recurrenceTag'

interface Props {
	habitId: string
}

const HabitDescription = ({ habitId }: Props) => {
	const description = api.habit.getDetail.useQuery({
		id: habitId,
	})

	if (description.isLoading) return null

	if (description.isError) {
		return (
			<Card
				className="flex items-center space-x-4 space-y-2 2xl:h-full"
				decoration="top"
			>
				<DetailError>{description.error.message}</DetailError>
			</Card>
		)
	}

	return (
		<Card
			className="flex items-center space-x-4 space-y-2 2xl:h-full"
			decoration="top"
		>
			<Icon icon={Text} size="xl" variant="light" />
			<div>
				<div className="p-2">
					<p className="text-scard-foreground flex-1 text-2xl">
						{description.data.description}
					</p>
				</div>

				<div>
					<div className="text-scard-foreground/40 p-2">
						<RecurrenceTag
							type={description.data.recurrenceType}
							step={description.data.recurrenceStep}
							days={description.data.recurrenceDays}
						/>
					</div>
					<div className="p-2">
						{description.data.labels.map((label) => {
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
}

export default HabitDescription
