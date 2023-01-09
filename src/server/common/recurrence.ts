import { Timestamp } from '@prisma/client'
import { TRPCError } from '@trpc/server'
import { eachDayOfInterval, isWeekend, isWithinInterval } from 'date-fns'
import {
  POSSIBLE_DAY_STEPS_WORDNUMBERS,
  WEEKDAYS_INDEXING,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
  WEEKDAY_SHORT_LONG_DICT,
  WORD_NUMBER_DICT,
} from 'lib/const'
import { RecurrenceConfig, RecurrenceType, Weekday } from 'types'
import { cleanseRecurrenceString, containsWordNumbers } from './todoist'

export const getRecurrenceType = (recurrence: string): RecurrenceType => {
  if (recurrence === 'every day') {
    return 'every_day'
  }
  if (recurrence === 'every workday') {
    return 'every_workday'
  }

  // Split string by space or comma and get rid of unsafe elements
  const safeElements = cleanseRecurrenceString(recurrence)

  //check if there are any numbers in the string
  const containsNumber = safeElements.some((el) => {
    return !isNaN(Number(el)) || POSSIBLE_DAY_STEPS_WORDNUMBERS.includes(el)
  })

  if (containsNumber || safeElements.includes('other')) {
    return 'every_x_days'
  }

  return 'specific_days'
}

export const getRecurrenceStep = (recurence: string): number => {
  const safeElements = cleanseRecurrenceString(recurence)

  if (safeElements.includes('other')) {
    return 2
  }

  if (containsWordNumbers(safeElements)) {
    const wordNumber = safeElements.find((el) =>
      POSSIBLE_DAY_STEPS_WORDNUMBERS.includes(el)
    )

    return WORD_NUMBER_DICT[wordNumber as keyof typeof WORD_NUMBER_DICT]
  }

  return Number(safeElements.find((el) => !isNaN(Number(el))))
}

export const getSpecificRecurrenceDays = (recurrence: string) => {
  const safeElements = cleanseRecurrenceString(recurrence)
  const onlyDays = safeElements.filter(
    (el) => WEEKDAYS_LONG.includes(el) || WEEKDAYS_SHORT.includes(el)
  )

  const hasShortWeekdays = safeElements.some((el) =>
    WEEKDAYS_SHORT.includes(el)
  )

  if (hasShortWeekdays) {
    return onlyDays.map(
      (el) =>
        WEEKDAY_SHORT_LONG_DICT[el as keyof typeof WEEKDAY_SHORT_LONG_DICT]
    )
  }

  return onlyDays
}

// Success Rates
//

export const getWeekdayIndexes = (days: Weekday[]) => {
  return days.map((day) => WEEKDAYS_INDEXING.indexOf(day))
}

export const getNumberOfDaysInInterval = (
  interval: Interval,
  recurrenceType: RecurrenceType,
  recurrenceConfig?: RecurrenceConfig
) => {
  if (recurrenceType === 'every_workday') {
    return eachDayOfInterval(interval).filter((day) => !isWeekend(day)).length
  } else if (recurrenceType === 'every_x_days') {
    if (!recurrenceConfig?.step) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Recurrence step is not set',
      })
    }
    return eachDayOfInterval(interval, { step: recurrenceConfig.step }).length
  } else if (recurrenceType === 'specific_days') {
    if (!recurrenceConfig?.days || recurrenceConfig.days.length === 0) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Recurrence days are not set',
      })
    }
    const indexes = getWeekdayIndexes(recurrenceConfig.days)

    return eachDayOfInterval(interval).filter((day) => {
      return indexes.includes(day.getDay())
    }).length
  }

  //recurrence is every day
  return eachDayOfInterval(interval).length
}

export const getNumberOfTimestampsInInterval = (
  timestamps: Timestamp[],
  interval: Interval
) => {
  return timestamps.filter((timestamp) => {
    return isWithinInterval(timestamp.time, interval)
  }).length
}

export const getSuccessRate = (
  numOfTimestampsInInterval: number,
  numOfDaysInInterval: number
) => {
  return ((numOfTimestampsInInterval / numOfDaysInInterval) * 100).toFixed(1)
}
