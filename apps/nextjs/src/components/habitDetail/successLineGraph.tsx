import { Card, LineChart, Title } from '@tremor/react'

import type { RouterOutputs } from '@habitsync/api'

interface Props {
	data: RouterOutputs['stats']['getExpSmoothingSuccessRate']
}

const SuccessLineGraph = ({ data }: Props) => {
	return (
		<Card>
			<Title>Habit score</Title>
			<LineChart
				className="mt-6"
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
