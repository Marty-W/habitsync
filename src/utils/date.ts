import { endOfMonth, getDaysInMonth, getISODay, startOfMonth } from 'date-fns'
import { CalendarData } from '../types'

export const generateCalendarData = (date: Date, timestamps: Set<number>) => {
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
      if (i < numberOfDaysFromPrevMonth) {
        day = daysInPrevMonth - numberOfDaysFromPrevMonth + i + 1
        return {
          day,
          thisMonth: false,
        }
      } else if (
        i >= numberOfDaysFromPrevMonth &&
        i < daysInMonth + numberOfDaysFromPrevMonth
      ) {
        day = i - numberOfDaysFromPrevMonth + 1

        return {
          day,
          done: timestamps.has(day),
          thisMonth: true,
        }
      } else {
        day = i - numberOfDaysFromPrevMonth - daysInMonth + 1

        return {
          day,
          thisMonth: false,
        }
      }
    }
  )
}

export const getNumCalRows = (date: Date) => {
  const firstISODay = getISODay(startOfMonth(date))
  const daysInMonth = getDaysInMonth(date)
  return Math.ceil((daysInMonth - (7 - firstISODay)) / 7) + 1
}

export const getMinDate = (timestamps: CalendarData | undefined) => {
  if (!timestamps) {
    const today = new Date()
    today.setDate(1)

    return today
  }

  const minYear = Math.min(...Object.keys(timestamps).map(Number))
  const minMonth = Math.min(...Object.keys(timestamps[minYear]).map(Number))

  return new Date(minYear, minMonth, 1)
}

export const getMaxDate = (timestamps: CalendarData | undefined) => {
  if (!timestamps) {
    const today = new Date()
    today.setDate(1)

    return today
  }
  const maxYear = Math.max(...Object.keys(timestamps).map(Number))
  const maxMonth = Math.max(...Object.keys(timestamps[maxYear]).map(Number))

  return new Date(maxYear, maxMonth - 1, 1)
}
