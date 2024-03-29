//FIX should be imported from @habitsync/api
import { z } from 'zod'

import { type RouterOutput } from '@habitsync/next/src/utils/trpc'

import { type generateCalendarMonth } from './date'

// {Year: {Month: [Day]}}
export interface SortedMonthInterval {
	[year: number]: {
		[month: number]: ReturnType<typeof generateCalendarMonth>
	}
}

export type Streak = {
	start: string
	end: string
	length: number
}

export type RecOpts =
	| {
			type: 'every_day'
	  }
	| {
			type: 'every_workday'
	  }
	| {
			type: 'specific_days'
			days: Weekday[]
	  }
	| {
			type: 'every_x_days'
			step: number
	  }

export type RecurrenceType = RecOpts['type']

export interface RecurrenceConfig {
	step?: number
	days?: Weekday[]
}

export type CalendarData =
	| RouterOutput['timestamp']['getAllWithStreakDays']
	| null
	| undefined
export type HabitDescriptionData =
	| RouterOutput['habit']['getDetail']
	| null
	| undefined
export type StreakData = RouterOutput['streak']['getBest'] | null | undefined
export type AllTimestampData =
	| RouterOutput['timestamp']['getAll']
	| null
	| undefined

export interface Interval {
	start: Date
	end: Date
}

export type Weekday =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'

export const DoistWebhookReqBodyShape = z.object({
	event_name: z.literal('item:completed'),
	event_data: z.object({
		due: z.object({
			is_recurring: z.literal(true),
		}),
		id: z.string(),
	}),
	user_id: z.string(),
})
