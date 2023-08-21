'use client'

import Link from 'next/link'
import { SiTodoist } from 'react-icons/si'

import Calendar from '~/components/habitDetail/calendar/calendar'
import TotalCompletions from '~/components/habitDetail/completions'
import CompletionsGraph from '~/components/habitDetail/completionsGraph'
import HabitDescription from '~/components/habitDetail/habitDescription'
import Streaks from '~/components/habitDetail/streaks'
import SuccessLineGraph from '~/components/habitDetail/successLineGraph'
import SuccessRate from '~/components/habitDetail/successRate'
import { Button } from '~/components/ui/button'
import useHabitDetailData from '~/hooks/useHabitDetailData'

interface Props {
	habitId: string
}

const HabitDetail = ({ habitId }: Props) => {
	const {
		calendarData,
		description,
		streaks,
		totalCompletions,
		successRate,
		timestampSummaryCounts,
		habitSmoothingData,
	} = useHabitDetailData(habitId)

	//TODO refactor this, only placeholder
	if (
		!timestampSummaryCounts.isSuccess ||
		!successRate.isSuccess ||
		!calendarData.isSuccess ||
		!streaks.isSuccess ||
		!description.isSuccess ||
		!totalCompletions.isSuccess ||
		!habitSmoothingData.isSuccess
	) {
		return null
	}

	return (
		<div className="2xl:auto-rows-fit flex flex-1 flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:px-4 xl:gap-y-8 2xl:grid-cols-4 2xl:grid-rows-[0.3fr_1fr_0.8fr_0.3fr]">
			<div className="col-span-1 2xl:col-span-2">
				<HabitDescription desc={description.data} />
			</div>
			<div className="col-span-2 col-start-1 2xl:row-start-2">
				<SuccessLineGraph data={habitSmoothingData.data} />
			</div>
			<div className="col-span-2 row-start-3 2xl:row-start-2">
				<CompletionsGraph timestamps={timestampSummaryCounts.data} />
			</div>
			<div className="col-span-2 row-start-4 2xl:row-start-3">
				<Calendar
					data={calendarData.data}
					startDate={description.data.createdAt}
				/>
			</div>

			<div className="col-span-2 row-start-5 2xl:row-start-3 2xl:self-stretch">
				<Streaks streaks={streaks.data} />
			</div>
			<div className="flex gap-4 lg:col-start-2 lg:row-start-1 2xl:col-span-2 2xl:col-start-3">
				<TotalCompletions completions={totalCompletions.data} />
				<SuccessRate rate={successRate.data} />
			</div>
			<Button
				variant="link"
				className="text-content row-start-6 lg:col-span-2 xl:self-center xl:text-lg 2xl:col-span-4 2xl:row-start-4"
			>
				<Link
					href={`${description.data?.url}`}
					target="_blank"
					className="mt-4 flex items-center justify-center"
				>
					<SiTodoist size="1rem" className="mr-1" />
					<span>Open in Todoist</span>
				</Link>
			</Button>
		</div>
	)
}

export default HabitDetail
