import { Card, Icon, Title } from '@tremor/react'
import { Tally5 } from 'lucide-react'

import { api } from '~/utils/trpc'
import Counter from '~/components/ui/animatedCounter'
import DetailError from './detailError'

interface Props {
	habitId: string
}

const TotalCompletions = ({ habitId }: Props) => {
	const totalCompletions = api.stats.getTotalHabitCompletions.useQuery({
		habitId,
	})

	if (totalCompletions.isLoading) return null
	if (totalCompletions.error) {
		return (
			<Card className="flex items-center space-x-4">
				<DetailError>{totalCompletions.error.message}</DetailError>
			</Card>
		)
	}

	const { data: numOfCompletions } = totalCompletions

	return (
		<Card className="flex items-center space-x-4">
			<Icon icon={Tally5} size="xl" variant="light" />
			<div>
				<Title>Completed</Title>
				<Counter
					from={0}
					to={numOfCompletions}
					className="text-ssecondary-foreground text-tremor-metric font-semibold"
					animationDuration={3}
					postValue={numOfCompletions > 1 ? ' times' : ' time'}
				/>
			</div>
		</Card>
	)
}

export default TotalCompletions
