'use client'

import Link from 'next/link'
import { Card, Flex, Grid } from '@tremor/react'
import { SiTodoist } from 'react-icons/si'

import Calendar from '~/components/habitDetail/calendar/calendar'
import TotalCompletions from '~/components/habitDetail/completions'
import CompletionsGraph from '~/components/habitDetail/completionsGraph'
import DetailHeader from '~/components/habitDetail/detailHeader'
import HabitDescription from '~/components/habitDetail/habitDescription'
import Streaks from '~/components/habitDetail/streaks'
import SuccessRate from '~/components/habitDetail/successRate'
import { Button } from '~/components/ui/button'
import useHabitDetailData from '~/hooks/useHabitDetailData'

interface Props {
	params: {
		id: string
	}
	searchParams: {
		name: string
	}
}

const HabitDetail = ({ params, searchParams }: Props) => {
	const { id } = params
	const { name } = searchParams

	const {
		calendarData,
		description,
		streaks,
		totalCompletions,
		successRate,
		timestampSummaryCounts,
	} = useHabitDetailData(id)

	//TODO refactor this, only placeholder
	if (
		!timestampSummaryCounts.isSuccess ||
		!successRate.isSuccess ||
		!calendarData.isSuccess ||
		!streaks.isSuccess ||
		!description.isSuccess ||
		!totalCompletions.isSuccess
	) {
		return null
	}

	return (
		<div className="flex min-h-screen flex-col px-7 py-8">
			<DetailHeader title={name} />
			<Grid numItemsMd={2} numItemsLg={3}>
				<HabitDescription desc={description.data} />
				<CompletionsGraph timestamps={timestampSummaryCounts.data} />
				<Calendar data={calendarData.data} />
				<Flex>
					<TotalCompletions completions={totalCompletions.data} />
					<SuccessRate rate={successRate.data} />
				</Flex>
				{/* <Streaks streaks={streaks.data} /> */}
				<Button variant="link">
					<Link
						href={`${description.data?.url}`}
						target="_blank"
						className="mt-4 flex items-center justify-center"
					>
						<SiTodoist size="1rem" className="mr-1" />
						<span>Open in Todoist</span>
					</Link>
				</Button>
			</Grid>
		</div>
	)
}

export default HabitDetail
