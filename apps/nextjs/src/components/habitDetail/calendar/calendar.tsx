import { useState } from 'react'
import { Card } from '@tremor/react'

import { normalizeDate } from '@habitsync/lib'

import { api } from '~/utils/trpc'
import ResizableSlidePanel from '~/components/ui/resizablePanel'
import useCalendarData from '~/hooks/useCalendar'
import DetailError from '../detailError'
import DayCell from './dayCell'
import MonthSwitcher from './monthSwitcher'
import WeekRow from './weekRow'

interface Props {
	habitId: string
}

export type AnimationDirection = 'left' | 'right' | null

const Calendar = ({ habitId }: Props) => {
	const calendarQueryData = api.timestamp.getAllWithStreakDays.useQuery({
		habitId,
	})
	const description = api.habit.getDetail.useQuery({
		id: habitId,
	})

	const { year, month, calendarData, handleAddMonth, handleSubMonth } =
		useCalendarData()
	const [animationDirection, setAnimationDirection] =
		useState<AnimationDirection>(null)

	const handleMonthChange = (type: 'addMonth' | 'subMonth') => {
		if (type === 'addMonth') {
			setAnimationDirection('right')
			handleAddMonth()
		} else {
			setAnimationDirection('left')
			handleSubMonth()
		}
	}

	if (calendarQueryData.isLoading || description.isLoading) {
		return null
	}

	if (calendarQueryData.isError || description.isError) {
		return (
			<Card>
				{calendarQueryData.isError && (
					<DetailError>{calendarQueryData.error.message}</DetailError>
				)}
				{description.isError && (
					<DetailError>{description.error.message}</DetailError>
				)}
			</Card>
		)
	}

	const { timestamps, extraStreakDays } = calendarQueryData.data
	const { createdAt } = description.data

	return (
		<Card>
			<div className="flex flex-col">
				<MonthSwitcher
					month={month}
					year={year}
					handleMonthChange={handleMonthChange}
				/>
				<WeekRow />
				<ResizableSlidePanel duration={0.5} slideDirection={animationDirection}>
					<div className="grid flex-1 grid-cols-7 place-items-center gap-y-4 pt-2">
						{calendarData.map((dateStr, i) => {
							const date = new Date(dateStr)
							const isThisMonth = month === date.getMonth()
							const isSuccessfull = timestamps.has(normalizeDate(date))
							const isExtraStreakDay = extraStreakDays?.has(normalizeDate(date))
							const isToday = normalizeDate(date) === normalizeDate(new Date())
							const isStartDay =
								normalizeDate(date) === normalizeDate(createdAt)
							const isTodayWithTimestamp = isToday && isSuccessfull

							// Outside this month
							if (!isThisMonth) {
								if (isSuccessfull) {
									return (
										<DayCell
											date={date}
											key={i}
											variant="notThisMonthWithTimestamp"
										/>
									)
								}
								return <DayCell date={date} key={i} variant="notThisMonth" />
							}

							if (isTodayWithTimestamp) {
								return (
									<DayCell date={date} key={i} variant="todayWithTimestamp" />
								)
							}

							if (isToday) {
								return <DayCell date={date} key={i} variant="today" />
							}

							if (isSuccessfull) {
								return <DayCell date={date} key={i} variant="withTimestamp" />
							}

							if (isExtraStreakDay) {
								return <DayCell date={date} key={i} variant="extraStreakDay" />
							}

							if (isStartDay) {
								return <DayCell date={date} key={i} variant="startDay" />
							}

							return <DayCell date={date} key={i} />
						})}
					</div>
				</ResizableSlidePanel>
			</div>
		</Card>
	)
}

export default Calendar
