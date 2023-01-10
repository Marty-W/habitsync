import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

export const generateCalendarMonth = (year: number, month: number) => {
  const firstDayOfMonth = startOfMonth(new Date(year, month))
  const lastDayOfMonth = endOfMonth(new Date(year, month))

  return eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }),
    end: lastDayOfWeek(lastDayOfMonth, { weekStartsOn: 1 }),
  })
}

export const areDaysConsecutive = (date1: Date, date2: Date) => {
  const diff = differenceInCalendarDays(date1, date2)

  return diff === 1 || diff === -1
}

export const getMidDay = (date: Date) => {
  const midDay = new Date(date)
  midDay.setHours(12, 0, 0, 0)

  return midDay
}
