import { cleanseRecurrenceString, containsWordNumbers } from './todoist'
import { getMidDay } from '@habitsync/lib'
import {
    POSSIBLE_DAY_STEPS_WORDNUMBERS,
    WEEKDAYS_INDEXING,
    WEEKDAYS_LONG,
    WEEKDAYS_SHORT,
    WEEKDAY_SHORT_LONG_DICT,
    WORD_NUMBER_DICT,
} from '@habitsync/lib'
import { type RecOpts, type RecurrenceType, type Weekday } from '@habitsync/lib'
// FIX
import { type Timestamp } from '@prisma/client'
import { eachDayOfInterval, isWeekend, isWithinInterval } from 'date-fns'

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
    const containsNumber = safeElements.some(el => {
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
        const wordNumber = safeElements.find(el => POSSIBLE_DAY_STEPS_WORDNUMBERS.includes(el))

        return WORD_NUMBER_DICT[wordNumber as keyof typeof WORD_NUMBER_DICT]
    }

    return Number(safeElements.find(el => !isNaN(Number(el))))
}

export const getSpecificRecurrenceDays = (recurrence: string) => {
    const safeElements = cleanseRecurrenceString(recurrence)
    const onlyDays = safeElements.filter(
        el => WEEKDAYS_LONG.includes(el) || WEEKDAYS_SHORT.includes(el),
    )

    const hasShortWeekdays = safeElements.some(el => WEEKDAYS_SHORT.includes(el))

    if (hasShortWeekdays) {
        return onlyDays.map(
            el => WEEKDAY_SHORT_LONG_DICT[el as keyof typeof WEEKDAY_SHORT_LONG_DICT],
        )
    }

    return onlyDays
}

// Success Rates
//

export const getWeekdayIndexes = (days: Weekday[]) => {
    return days.map(day => WEEKDAYS_INDEXING.indexOf(day))
}

export const getNumberOfDaysInInterval = (interval: Interval, opts: RecOpts) => {
    const { type } = opts
    if (type === 'every_workday') {
        return eachDayOfInterval(interval).filter(day => !isWeekend(day)).length
    } else if (type === 'every_x_days') {
        return eachDayOfInterval(interval, { step: opts.step }).length
    } else if (type === 'specific_days') {
        const indexes = getWeekdayIndexes(opts.days)

        return eachDayOfInterval(interval).filter(day => {
            return indexes.includes(day.getDay())
        }).length
    }

    //recurrence is every day
    return eachDayOfInterval(interval).length
}

export const getNumberOfTimestampsInInterval = (timestamps: Timestamp[], interval: Interval) => {
    return timestamps.filter(timestamp => {
        return isWithinInterval(getMidDay(timestamp.time), interval)
    }).length
}

export const getSuccessRate = (numOfTimestampsInInterval: number, numOfDaysInInterval: number) => {
    return ((numOfTimestampsInInterval / numOfDaysInInterval) * 100).toFixed(1)
}
