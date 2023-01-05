import { cleanseRecurrenceString } from '@/server/common/todoist'
import { generateCalendarMonth } from 'lib/date'

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
