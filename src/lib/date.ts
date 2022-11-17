import {
  eachMonthOfInterval,
  endOfMonth,
  getDaysInMonth,
  getISODay,
  startOfMonth,
} from 'date-fns'
import { SortedMonthInterval } from '../types'

export const generateCalendarMonth = (date: Date) => {
  const daysInMonth = getDaysInMonth(date)
  const daysInPrevMonth = getDaysInMonth(
    new Date(date.getFullYear(), date.getMonth() - 1, 1)
  )
  const firstISODay = getISODay(startOfMonth(date))
  const lastISODay = getISODay(endOfMonth(date))
  const startingColumn = firstISODay - 1
  const endingColumn = lastISODay - 1
  const numberOfDaysFromPrevMonth = startingColumn
  const numberOfDaysFromNextMonth = 7 - endingColumn - 1

  return Array.from(
    {
      length:
        numberOfDaysFromPrevMonth + daysInMonth + numberOfDaysFromNextMonth,
    },
    (_, i) => {
      let day
      let dayDate
      if (i < numberOfDaysFromPrevMonth) {
        day = daysInPrevMonth - numberOfDaysFromPrevMonth + i + 1
        dayDate = new Date(
          date.getFullYear(),
          date.getMonth() - 1,
          day
        ).toDateString()
        return {
          dayDate,
          thisMonth: false,
        }
      } else if (
        i >= numberOfDaysFromPrevMonth &&
        i < daysInMonth + numberOfDaysFromPrevMonth
      ) {
        day = i - numberOfDaysFromPrevMonth + 1
        dayDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          day
        ).toDateString()
        return {
          dayDate,
          thisMonth: true,
        }
      } else {
        day = i - numberOfDaysFromPrevMonth - daysInMonth + 1
        dayDate = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          day
        ).toDateString()
        return {
          dayDate,
          thisMonth: false,
        }
      }
    }
  )
}

export const generateCalendarInterval = (start: Date, end: Date) => {
  const monthStarts = eachMonthOfInterval({ start, end })

  return monthStarts
    .map((monthStart) => generateCalendarMonth(monthStart))
    .reduce((acc: SortedMonthInterval, curr) => {
      const firstDayOfMonth = curr.find((day) => day.thisMonth)

      if (!firstDayOfMonth) return acc

      const month = new Date(firstDayOfMonth.dayDate).getMonth() + 1
      const year = new Date(firstDayOfMonth.dayDate).getFullYear()

      if (!acc[year]) {
        acc[year] = {}
      }

      if (!acc[year][month]) {
        acc[year][month] = curr
      }

      return acc
    }, {})
}

export const getNumCalRows = (date: Date) => {
  const firstISODay = getISODay(startOfMonth(date))
  const daysInMonth = getDaysInMonth(date)
  return Math.ceil((daysInMonth - (7 - firstISODay)) / 7) + 1
}
