import { getWeekdayIndexes } from '@/server/common/recurrence'
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isFriday,
  isMonday,
  lastDayOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { RecOpts } from 'types'

export const generateCalendarMonth = (year: number, month: number) => {
  const firstDayOfMonth = startOfMonth(new Date(year, month))
  const lastDayOfMonth = endOfMonth(new Date(year, month))

  return eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }),
    end: lastDayOfWeek(lastDayOfMonth, { weekStartsOn: 1 }),
  })
}

export const areDaysConsecutive = (date1: Date, date2: Date, opts: RecOpts) => {
  const { type } = opts
  let diff

  if (type === 'specific_days') {
    const { days } = opts

    if (days.length === 1) {
      return Math.abs(differenceInCalendarDays(date1, date2)) === 7
    }

    const dayIndexes = getWeekdayIndexes(days)
    let localDate1 = date1
    let localDate2 = date2

    if (isBefore(date2, date1)) {
      localDate1 = date2
      localDate2 = date1
    }

    //Find out the index of the first date
    const firstDateIndex = dayIndexes.indexOf(localDate1.getDay())
    const firstDateDayIndexShouldBe = dayIndexes[firstDateIndex]
    // Now i know the position of the second date in the array of days
    const secondDateDayIndexShouldBe =
      firstDateIndex === dayIndexes.length - 1 ? dayIndexes[0] : dayIndexes[firstDateIndex + 1]

    const inOneWeek = Math.abs(differenceInCalendarDays(localDate1, localDate2)) <= 7
    const firstDateOnTime = localDate1.getDay() === firstDateDayIndexShouldBe
    const secondDateOnTime = localDate2.getDay() === secondDateDayIndexShouldBe

    return inOneWeek && firstDateOnTime && secondDateOnTime
  }

  if (type === 'every_x_days') {
    const { step } = opts

    diff = Math.abs(differenceInCalendarDays(date1, date2))

    return diff <= step
  }

  if (
    type === 'every_workday' &&
    ((isFriday(date1) && isMonday(date2)) || (isFriday(date2) && isMonday(date1)))
  ) {
    diff = Math.abs(differenceInCalendarDays(date1, date2))

    return diff === 3
  }

  if (type === 'every_day' || type === 'every_workday') {
    diff = Math.abs(differenceInCalendarDays(date1, date2))
    return diff === 1
  }
}

export const getMidDay = (date: Date) => {
  const midDay = new Date(date)
  midDay.setHours(12, 0, 0, 0)

  return midDay
}

export const normalizeDate = (date: Date) => {
  return format(date, 'yyyy-MM-dd')
}

// export const splitIntoMonths = (dates: Date[]) => {

// }
