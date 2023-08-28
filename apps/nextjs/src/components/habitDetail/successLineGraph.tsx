import { Card, LineChart, Title } from '@tremor/react'
import { AlertCircle } from 'lucide-react'

import { api } from '~/utils/trpc'
import ComponentDialog from './componentDialog'
import DetailError from './detailError'

interface Props {
	habitId: string
}

const SuccessLineGraph = ({ habitId }: Props) => {
	const habitSmoothingData = api.stats.getExpSmoothingSuccessRate.useQuery(
		{
			habitId,
		},
		{
			retry: false,
			retryOnMount: false,
		},
	)

	if (habitSmoothingData.isLoading) return null

	return (
		<Card className="2xl:flex 2xl:h-full 2xl:flex-col">
			<div className="flex items-center justify-between">
				<Title>Habit score</Title>
				<ComponentDialog
					title="Understanding Your Habit Journey"
					text="
						This graph illustrates your habit consistency over time, offering a
						clearer view of your progress. Through smoothed scoring, you can
						easily spot patterns, understand your dedication levels, and stay
						motivated. It's not just about daily successes, but your
						overall journey. Stay on track, and watch the positive trends
						unfold!
					"
				/>
			</div>
			{!habitSmoothingData.error ? (
				<LineChart
					className="mt-6 min-w-full 2xl:flex-1"
					data={habitSmoothingData.data}
					index="date"
					categories={['Habit score']}
					yAxisWidth={40}
					valueFormatter={(value) => `${value}%`}
				/>
			) : (
				<DetailError>{habitSmoothingData.error.message}</DetailError>
			)}
		</Card>
	)
}

export default SuccessLineGraph
