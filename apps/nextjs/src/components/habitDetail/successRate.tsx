import { Card, Icon, Title } from '@tremor/react'
import { Activity } from 'lucide-react'

import { api } from '~/utils/trpc'
import Counter from '~/components/ui/animatedCounter'
import DetailError from './detailError'

interface Props {
	habitId: string
}

const SuccessRate = ({ habitId }: Props) => {
	const successRate = api.stats.getHabitSuccessRate.useQuery(
		{
			habitId,
		},
		{
			retry: false,
			retryOnMount: false,
		},
	)

	if (successRate.isLoading) return null
	if (successRate.error) {
		return (
			<Card className="flex items-center space-x-4">
				<DetailError>{successRate.error.message}</DetailError>
			</Card>
		)
	}

	const { data } = successRate

	return (
		<Card className="flex items-center space-x-4">
			<Icon icon={Activity} size="xl" variant="light" />
			<div>
				<Title>Hits</Title>
				<Counter
					from={0}
					to={Number(data)}
					className="text-ssecondary-foreground text-tremor-metric font-semibold"
					animationDuration={3}
					postValue=" %"
				/>
			</div>
		</Card>
	)
}

export default SuccessRate
