import { RecOpts, Streak, Weekday } from 'types'
import {
    addDays,
    differenceInCalendarDays,
    differenceInDays,
    eachDayOfInterval,
    isBefore,
    isFriday,
    isMonday,
    isToday,
    isYesterday,
    nextSaturday,
    nextSunday,
    subDays,
} from 'date-fns'
import { areDaysConsecutive, normalizeDate } from 'lib/date'
import { getWeekdayIndexes } from './recurrence'

export const calculateAllStreaks = (dates: Date[], recOpts: RecOpts, normalized?: boolean) => {
    const { type } = recOpts
    const areSortedAsc = isBefore(dates[0], dates[dates.length - 1])
    let localDates = dates

    if (areSortedAsc) {
        localDates = dates.reverse()
    }

    if (type === 'specific_days') {
        const completionWeekDayIndexes = getWeekdayIndexes(recOpts.days || [])
        //filter out days timestamps that are not on days specified in RecurrenceConfig
        localDates = localDates.filter(date => {
            const weekDayIndex = date.getDay()
            return completionWeekDayIndexes.includes(weekDayIndex)
        })
    }

    const result = localDates
        .reduce((streaks: Streak[], timestamp, idx, arr) => {
            const prevTimestamp = arr[idx - 1]

            if (idx === 0 || !areDaysConsecutive(prevTimestamp, timestamp, recOpts)) {
                streaks.push({
                    start: timestamp.toString(),
                    end: timestamp.toString(),
                    length: 1,
                })
                return streaks
            }

            const lastStreak = streaks[streaks.length - 1]

            if (areDaysConsecutive(prevTimestamp, timestamp, recOpts)) {
                lastStreak.length++
                lastStreak.start = timestamp.toString()
            } else {
                lastStreak.start = timestamp.toString()
                streaks.push(lastStreak)
            }

            return streaks
        }, [])
        .filter(streak => streak.length > 1)
        .sort((a, b) => b.length - a.length)

    return normalized
        ? result.map(streak => {
              return {
                  ...streak,
                  start: normalizeDate(new Date(streak.start)),
                  end: normalizeDate(new Date(streak.end)),
              }
          })
        : result
}

export const calculateCurrentStreak = (dates: Date[]) => {
    //TODO Adapt for every_x_days, specific_days, every_workday + tests
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

export const getExclusiveInterval = (date1: Date, date2: Date) => {
    const start = addDays(date1, 1)
    const end = subDays(date2, 1)

    return eachDayOfInterval({ start, end })
}

export const getExtraStreakDaysForSpecificDays = (
    timestamps: Date[],
    recurrenceDays: Weekday[],
) => {
    const extraDays: Date[] = []
    const completionWeekDayIndexes = getWeekdayIndexes(recurrenceDays)

    const actualCompletionsOnTime = timestamps.filter(timestamp => {
        const weekdayIndex = timestamp.getDay()
        return completionWeekDayIndexes.includes(weekdayIndex)
    })

    actualCompletionsOnTime.forEach((timestamp, idx, arr) => {
        if (idx === arr.length - 1) return
        extraDays.push(...getExclusiveInterval(timestamp, arr[idx + 1]))
    })

    return extraDays.map(date => normalizeDate(date))
}

export const getExtraStreakDaysForWorkdays = (timestamps: Date[]) => {
    const extraDays: Date[] = []
    timestamps.forEach((timestamp, idx, arr) => {
        if (isFriday(timestamp)) {
            const nextTimestamp = arr[idx + 1]

            if (nextTimestamp && isMonday(nextTimestamp)) {
                const saturday = nextSaturday(timestamp)
                const sunday = nextSunday(timestamp)
                extraDays.push(saturday, sunday)
            }
        }
    })

    return extraDays.map(date => normalizeDate(date))
}

export const getExtraStreakDaysForStepDays = (timestamps: Date[], step: number) => {
    const extraDays: Date[] = []

    timestamps.forEach((timestamp, idx, arr) => {
        const nextTimestamp = arr[idx + 1]
        if (nextTimestamp && step) {
            const diffInDays = differenceInCalendarDays(nextTimestamp, timestamp)

            if (diffInDays < step) {
                const nextDayAccordingToStep = addDays(timestamp, step)
                const isNextDayInTimestamps = arr.some(
                    timestamp => normalizeDate(timestamp) === normalizeDate(nextDayAccordingToStep),
                )

                if (isNextDayInTimestamps) {
                    extraDays.push(...getExclusiveInterval(timestamp, nextDayAccordingToStep))
                }
            }
            if (diffInDays === step) {
                extraDays.push(...getExclusiveInterval(timestamp, nextTimestamp))
            }
        }
    })

    return extraDays.map(date => normalizeDate(date))
}
