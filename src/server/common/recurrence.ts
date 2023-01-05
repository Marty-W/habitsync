import {
  POSSIBLE_DAY_STEPS_WORDNUMBERS,
  WEEKDAYS_LONG,
  WEEKDAYS_SHORT,
  WEEKDAY_SHORT_LONG_DICT,
  WORD_NUMBER_DICT,
} from 'lib/const'
import { RecurrenceType } from 'types'
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
