import { generateCalendarMonth } from '../lib/date'

// {Year: {Month: [Day]}}
export interface SortedMonthInterval {
  [year: number]: {
    [month: number]: ReturnType<typeof generateCalendarMonth>
  }
}
