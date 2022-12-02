import {
  differenceInDays,
  eachMonthOfInterval,
  endOfMonth,
  getDaysInMonth,
  getISODay,
  isToday,
  isYesterday,
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

interface Streak {
  start?: string
  end?: string
  length: number
}

const areDaysConsecutive = (date1: Date | string, date2: Date | string) => {
  const diff = differenceInDays(new Date(date1), new Date(date2))
  return diff === 1
}

export const calculateAllStreaks = (dates: Date[]) => {
  return dates
    .reduce((streaks: Streak[], timestamp, idx, arr) => {
      const prevTimestamp = arr[idx - 1]

      if (idx === 0 || !areDaysConsecutive(prevTimestamp, timestamp)) {
        streaks.push({
          start: timestamp.toDateString(),
          end: timestamp.toDateString(),
          length: 1,
        })
        return streaks
      }

      const lastStreak = streaks[streaks.length - 1]

      if (areDaysConsecutive(prevTimestamp, timestamp)) {
        lastStreak.length++
        lastStreak.start = timestamp.toDateString()
      } else {
        lastStreak.start = timestamp.toISOString()
        streaks.push(lastStreak)
      }

      return streaks
    }, [])
    .filter((streak) => streak.length > 1)
}

export const calculateCurrentStreak = (dates: Date[]) => {
  let isStreakActive = true
  let currentStreak = 0
  let streakStart

  for (let i = 0; i < dates.length; i++) {
    if (i === 0) {
      const shouldContinue = isToday(dates[i]) || isYesterday(dates[i])

      if (shouldContinue) {
        currentStreak++
        streakStart = dates[i]
        continue
      } else {
        isStreakActive = false
        break
      }
    }

    const diffInDays = differenceInDays(dates[i - 1], dates[i])

    if (diffInDays === 1) {
      currentStreak++
      streakStart = dates[i]
    } else {
      break
    }
  }

  return isStreakActive ? null : { start: streakStart, length: currentStreak }
}
