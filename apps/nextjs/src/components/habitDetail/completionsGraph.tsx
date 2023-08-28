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

import { api } from '~/utils/trpc'
import DetailError from './detailError'

interface Props {
	habitId: string
}

const CompletionsGraph = ({ habitId }: Props) => {
	const timestampSummaryCounts = api.timestamp.getSummaryCounts.useQuery({
		habitId,
	})

	if (timestampSummaryCounts.isLoading) return null

	return (
		<Card className="2xl:h-full">
			<Title className="mb-2">Completions overview</Title>
			<TabGroup>
				<TabList>
					<Tab>Week</Tab>
					<Tab>Month</Tab>
					<Tab>Year</Tab>
				</TabList>
				{!timestampSummaryCounts.isError ? (
					<TabPanels>
						<TabPanel>
							<BarChart
								data={timestampSummaryCounts.data.weekChartData}
								index="name"
								categories={['Week completions']}
								allowDecimals={false}
								maxValue={7}
								className="2xl:h-[450px]"
							/>
						</TabPanel>
						<TabPanel>
							<BarChart
								data={timestampSummaryCounts.data.monthChartData}
								index="name"
								categories={['Month completions']}
								allowDecimals={false}
								className="2xl:h-[450px]"
							/>
						</TabPanel>
						<TabPanel>
							<BarChart
								data={timestampSummaryCounts.data.yearChartData}
								index="name"
								categories={['Year completions']}
								allowDecimals={false}
								className="2xl:h-[450px]"
							/>
						</TabPanel>
					</TabPanels>
				) : (
					<DetailError>{timestampSummaryCounts.error.message}</DetailError>
				)}
			</TabGroup>
		</Card>
	)
}

export default CompletionsGraph
