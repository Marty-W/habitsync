import {
	BarChart,
	Card,
	Tab,
	TabGroup,
	TabList,
	TabPanel,
	TabPanels,
	Title,
} from '@tremor/react'

import type { RouterOutputs } from '@habitsync/api'

interface Props {
	timestamps: RouterOutputs['timestamp']['getSummaryCounts']
}

const CompletionsGraph = ({ timestamps }: Props) => {
	const { weekChartData, monthChartData, yearChartData } = timestamps

	return (
		<Card>
			<Title>Completions overview</Title>
			<TabGroup>
				<TabList>
					<Tab>Week</Tab>
					<Tab>Month</Tab>
					<Tab>Year</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<BarChart
							data={weekChartData}
							index="name"
							categories={['Week completions']}
							allowDecimals={false}
							maxValue={7}
							autoMinValue
						/>
					</TabPanel>
					<TabPanel className="h-full w-full">
						<BarChart
							data={monthChartData}
							index="name"
							categories={['Month completions']}
							allowDecimals={false}
						/>
					</TabPanel>
					<TabPanel className="h-full w-full">
						<BarChart
							data={yearChartData}
							index="name"
							categories={['Year completions']}
							allowDecimals={false}
						/>
					</TabPanel>
				</TabPanels>
			</TabGroup>
		</Card>
	)
}

export default CompletionsGraph
