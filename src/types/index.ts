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

export type CleanDoistRecurrenceString = ReturnType<typeof cleanseRecurrenceString>

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

export type CalendarData = RouterOutput['timestamp']['getAllWithStreakDays'] | null | undefined
export type HabitDescriptionData = RouterOutput['habit']['getDetail'] | null | undefined
export type StreakData = RouterOutput['streak']['getBest'] | null | undefined

export interface Interval {
    start: Date
    end: Date
}

export type Weekday = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
