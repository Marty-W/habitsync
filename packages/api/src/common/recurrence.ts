import type { Timestamp } from '@prisma/client'
import {
	eachDayOfInterval,
	format,
	isWeekend,
	isWithinInterval,
} from 'date-fns'

import {
	getMidDay,
	normalizeDate,
	POSSIBLE_DAY_STEPS_WORDNUMBERS,
	WEEKDAY_SHORT_LONG_DICT,
	WEEKDAYS_INDEXING,
	WEEKDAYS_LONG,
	WEEKDAYS_SHORT,
	WORD_NUMBER_DICT,
} from '@habitsync/lib'
import type { RecOpts, RecurrenceType, Weekday } from '@habitsync/lib'

import type { getHabitRecurrenceAndTimestamps } from './prisma'
import {
	getExtraStreakDaysForSpecificDays,
	getExtraStreakDaysForStepDays,
	getExtraStreakDaysForWorkdays,
} from './streaks'
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
			POSSIBLE_DAY_STEPS_WORDNUMBERS.includes(el),
		)

		return WORD_NUMBER_DICT[wordNumber as keyof typeof WORD_NUMBER_DICT]
	}

	return Number(safeElements.find((el) => !isNaN(Number(el))))
}

export const getSpecificRecurrenceDays = (recurrence: string) => {
	const safeElements = cleanseRecurrenceString(recurrence)
	const onlyDays = safeElements.filter(
		(el) => WEEKDAYS_LONG.includes(el) || WEEKDAYS_SHORT.includes(el),
	)

	const hasShortWeekdays = safeElements.some((el) =>
		WEEKDAYS_SHORT.includes(el),
	)

	if (hasShortWeekdays) {
		return onlyDays.map(
			(el) =>
				WEEKDAY_SHORT_LONG_DICT[el as keyof typeof WEEKDAY_SHORT_LONG_DICT],
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
	opts: RecOpts,
) => {
	const { type } = opts
	if (type === 'every_workday') {
		return eachDayOfInterval(interval).filter((day) => !isWeekend(day)).length
	} else if (type === 'every_x_days') {
		return eachDayOfInterval(interval, { step: opts.step }).length
	} else if (type === 'specific_days') {
		const indexes = getWeekdayIndexes(opts.days)

		return eachDayOfInterval(interval).filter((day) => {
			return indexes.includes(day.getDay())
		}).length
	}

	//recurrence is every day
	return eachDayOfInterval(interval).length
}

export const getNumberOfTimestampsInInterval = (
	timestamps: Timestamp[],
	interval: Interval,
) => {
	return timestamps.filter((timestamp) => {
		return isWithinInterval(getMidDay(timestamp.time), interval)
	}).length
}

export const getSuccessRate = (
	numOfTimestampsInInterval: number,
	numOfDaysInInterval: number,
) => {
	return ((numOfTimestampsInInterval / numOfDaysInInterval) * 100).toFixed(1)
}

interface Day {
	date: Date
	value: number
}

export const getHabitSmoothing = (
	data: Day[],
	startDate: Date,
	opts: {
		alpha: number
		warmupDays: number
		extraStreakDays?: string[]
	},
) => {
	if (!data.length) {
		throw new Error('Input data array is empty!')
	}
	const smoothedData: { date: string; 'Habit score': number }[] = []
	let previous = ((data[0]?.value?.valueOf() ?? 0) * 1) / opts.warmupDays

	for (let i = 0; i < data.length; i++) {
		let current

		const currentDate = new Date(startDate)
		currentDate.setDate(currentDate.getDate() + i)

		if (
			opts.extraStreakDays &&
			opts.extraStreakDays.includes(normalizeDate(currentDate))
		) {
			current = previous
		} else {
			current = opts.alpha * data[i]?.value + (1 - opts.alpha) * previous

			if (i < opts.warmupDays) {
				current = Math.min(current, (i + 1) / opts.warmupDays)
			}
		}

		smoothedData.push({
			date: format(currentDate, 'dd. MM.'),
			'Habit score': Number((current * 100).toFixed(1)),
		})

		previous = current
	}

	return smoothedData
}

interface SmoothingOptions {
	alpha: number
	warmupDays: number
	extraStreakDays?: string[]
}

interface SmoothingBase {
	date: Date
	value: number
}

export const calculateSmoothingForRecurrence = (
	habit: Awaited<ReturnType<typeof getHabitRecurrenceAndTimestamps>>,
	everyDaySinceHabitStarted: SmoothingBase[],
): ReturnType<typeof getHabitSmoothing> => {
	const baseSmoothingOptions: SmoothingOptions = {
		alpha: 0.3,
		warmupDays: 30,
	}

	const timestampsOnly = habit.timestamps.map((timestamp) => timestamp.time)

	switch (habit.recurrenceType) {
		case 'every_day':
			return getHabitSmoothing(
				everyDaySinceHabitStarted,
				new Date(habit.createdAt),
				baseSmoothingOptions,
			)
		case 'every_workday':
			return getHabitSmoothing(
				everyDaySinceHabitStarted,
				new Date(habit.createdAt),
				{
					...baseSmoothingOptions,
					extraStreakDays: getExtraStreakDaysForWorkdays(timestampsOnly),
				},
			)
		case 'every_x_days':
			return getHabitSmoothing(
				everyDaySinceHabitStarted,
				new Date(habit.createdAt),
				{
					...baseSmoothingOptions,
					extraStreakDays: getExtraStreakDaysForStepDays(
						timestampsOnly,
						habit.recurrenceStep!,
					),
				},
			)
		case 'specific_days':
			return getHabitSmoothing(
				everyDaySinceHabitStarted,
				new Date(habit.createdAt),
				{
					...baseSmoothingOptions,
					extraStreakDays: getExtraStreakDaysForSpecificDays(
						timestampsOnly,
						habit.recurrenceDays as Weekday[],
					),
				},
			)
		default:
			throw new Error('Unsupported recurrence type')
	}
}
