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
