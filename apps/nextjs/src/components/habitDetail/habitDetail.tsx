'use client'

import Link from 'next/link'
import { useIsFetching } from '@tanstack/react-query'
import { Card } from '@tremor/react'
import { SiTodoist } from 'react-icons/si'

import { api } from '~/utils/trpc'
import Calendar from '~/components/habitDetail/calendar/calendar'
import TotalCompletions from '~/components/habitDetail/completions'
import CompletionsGraph from '~/components/habitDetail/completionsGraph'
import HabitDescription from '~/components/habitDetail/habitDescription'
import Streaks from '~/components/habitDetail/streaks'
import SuccessLineGraph from '~/components/habitDetail/successLineGraph'
import SuccessRate from '~/components/habitDetail/successRate'
import { Button } from '~/components/ui/button'
import Spinner from '../ui/spinner'

interface Props {
	habitId: string
}

const HabitDetail = ({ habitId }: Props) => {
	const isFetching = useIsFetching()
	const description = api.habit.getDetail.useQuery({ id: habitId })

	if (isFetching) {
		return <Spinner className="text-sprimary mx-auto h-24 w-24" />
	}

	return (
		<div className="2xl:auto-rows-fit flex flex-1 flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:px-4 xl:gap-y-8 2xl:grid-cols-4 2xl:grid-rows-[0.3fr_1fr_0.8fr_0.3fr]">
			<div className="col-span-1 2xl:col-span-2">
				<HabitDescription habitId={habitId} />
			</div>
			<div className="col-span-2 col-start-1 2xl:row-start-2">
				<SuccessLineGraph habitId={habitId} />
			</div>
			<div className="col-span-2 row-start-3 2xl:row-start-2">
				<CompletionsGraph habitId={habitId} />
			</div>
			<div className="col-span-2 row-start-4 2xl:row-start-3">
				<Calendar habitId={habitId} />
			</div>

			<div className="col-span-2 row-start-5 2xl:row-start-3 2xl:self-stretch">
				<Streaks habitId={habitId} />
			</div>
			<div className="flex gap-4 lg:col-start-2 lg:row-start-1 2xl:col-span-2 2xl:col-start-3">
				<TotalCompletions habitId={habitId} />
				<SuccessRate habitId={habitId} />
			</div>
			<Button
				variant="link"
				className="text-content row-start-6 lg:col-span-2 xl:self-center xl:text-lg 2xl:col-span-4 2xl:row-start-4"
				asChild
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
