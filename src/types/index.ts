import { cleanseRecurrenceString } from '@/server/common/todoist'
import { generateCalendarMonth } from 'lib/date'
import { RouterOutput } from 'lib/trpc'

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

export type CleanDoistRecurrenceString = ReturnType<
  typeof cleanseRecurrenceString
>

export type RecurrenceType =
  | 'every_day'
  | 'every_workday'
  | 'every_x_days'
  | 'specific_days'

export type CalendarData =
  | RouterOutput['timestamp']['getAll']
  | null
  | undefined
export type HabitDescriptionData =
  | RouterOutput['habit']['getDetail']
  | null
  | undefined
export type StreakData = RouterOutput['streak']['getBest'] | null | undefined

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
