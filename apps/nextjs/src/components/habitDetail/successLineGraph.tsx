import { Card, LineChart, Title } from '@tremor/react'

import type { RouterOutputs } from '@habitsync/api'

import ComponentDialog from './componentDialog'

interface Props {
	data: RouterOutputs['stats']['getExpSmoothingSuccessRate']
}

const SuccessLineGraph = ({ data }: Props) => {
	return (
		<Card className="2xl:flex 2xl:h-full 2xl:flex-col">
			<div className="flex items-center justify-between">
				<Title>Habit score</Title>
				<ComponentDialog title="Understanding Your Habit Journey">
					<p>
						This graph illustrates your habit consistency over time, offering a
						clearer view of your progress. Through smoothed scoring, you can
						easily spot patterns, understand your dedication levels, and stay
						motivated. It's not just about daily successes, but your overall
						journey. Stay on track, and watch the positive trends unfold!
					</p>
				</ComponentDialog>
			</div>
			<LineChart
				className="mt-6 2xl:flex-1"
				data={data}
				index="date"
				categories={['Habit score']}
				yAxisWidth={40}
				valueFormatter={(value) => `${value}%`}
			/>
		</Card>
	)
}

export default SuccessLineGraph
