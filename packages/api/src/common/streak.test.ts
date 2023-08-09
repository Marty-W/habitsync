import { isBefore } from 'date-fns'
import { describe, expect, it } from 'vitest'

import { type Weekday } from '@habitsync/lib'

import {
	calculateAllStreaks,
	getExtraStreakDaysForSpecificDays,
	getExtraStreakDaysForStepDays,
	getExtraStreakDaysForWorkdays,
} from './streaks'

describe('getExtraStreakDays for "every_workday"', () => {
	it('should return weekend in extra days if timestamps include friday and monday', () => {
		const timestamps = ['2023-01-05', '2023-01-06', '2023-01-09'].map(
			(date) => new Date(date),
		)
		const expected = ['2023-01-07', '2023-01-08']
		const result = getExtraStreakDaysForWorkdays(timestamps)

		expect(result).toEqual(expected)
		expect(result).toHaveLength(2)
	})
	it('should return empty array if timestamps include friday and lack monday', () => {
		const timestamps = ['2023-01-05', '2023-01-06', '2023-01-10'].map(
			(date) => new Date(date),
		)
		const result = getExtraStreakDaysForWorkdays(timestamps)

		expect(result).toHaveLength(0)
	})
})

describe('getExtraStreakDays for "every_x_days"', () => {
	it('should return intervals between two timestamps that are exactly recurrence_step between', () => {
		const timestamps = ['2023-01-05', '2023-01-07', '2023-01-09'].map(
			(date) => new Date(date),
		)
		const expected = ['2023-01-06', '2023-01-08']
		const result = getExtraStreakDaysForStepDays(timestamps, 2)

		expect(result).toEqual(expected)
		expect(result).toHaveLength(2)
	})

	it('should work with longer periods between', () => {
		const timestamps = ['2023-01-05', '2023-01-10', '2023-01-15'].map(
			(date) => new Date(date),
		)
		const expected = [
			'2023-01-06',
			'2023-01-07',
			'2023-01-08',
			'2023-01-09',
			'2023-01-11',
			'2023-01-12',
			'2023-01-13',
			'2023-01-14',
		]
		const result = getExtraStreakDaysForStepDays(timestamps, 5)

		expect(result).toEqual(expected)
		expect(result).toHaveLength(expected.length)
	})

	it('should omit timestamps that doesnt fit the step', () => {
		const timestamps = [
			'2023-01-05',
			'2023-01-07',
			'2023-01-08',
			'2023-01-09',
		].map((date) => new Date(date))
		const expected = ['2023-01-06', '2023-01-08']
		const result = getExtraStreakDaysForStepDays(timestamps, 2)

		expect(result).toEqual(expected)
		expect(result).toHaveLength(expected.length)
	})
})

describe('getExtraStreakDays for "specific_days"', () => {
	it('should return intervals between weekdays that fit the recurrence day schema', () => {
		const timestamps = [
			'2023-01-02',
			'2023-01-04',
			'2023-01-06',
			'2023-01-09',
		].map((date) => new Date(date))
		const recurrence_days = ['monday', 'wednesday', 'friday']
		const expected = ['2023-01-03', '2023-01-05', '2023-01-07', '2023-01-08']
		const result = getExtraStreakDaysForSpecificDays(
			timestamps,
			recurrence_days as Weekday[],
		)

		expect(result).toEqual(expected)
		expect(result).toHaveLength(expected.length)
	})

	it('should work with longer periods between', () => {
		const timestamps = [
			'2023-01-02',
			'2023-01-07',
			'2023-01-09',
			'2023-01-14',
		].map((date) => new Date(date))
		const expected = [
			'2023-01-03',
			'2023-01-04',
			'2023-01-05',
			'2023-01-06',
			'2023-01-08',
			'2023-01-10',
			'2023-01-11',
			'2023-01-12',
			'2023-01-13',
		]
		const result = getExtraStreakDaysForSpecificDays(timestamps, [
			'monday',
			'saturday',
		])

		expect(result).toEqual(expected)
		expect(result).toHaveLength(expected.length)
	})

	it('should omit timestamps that doesnt fit the recurrence_days schema', () => {
		const timestamps = [
			'2023-01-02',
			'2023-01-03',
			'2023-01-07',
			'2023-01-09',
			'2023-01-12',
			'2023-01-14',
		].map((date) => new Date(date))
		const expected = [
			'2023-01-03',
			'2023-01-04',
			'2023-01-05',
			'2023-01-06',
			'2023-01-08',
			'2023-01-10',
			'2023-01-11',
			'2023-01-12',
			'2023-01-13',
		]
		const result = getExtraStreakDaysForSpecificDays(timestamps, [
			'monday',
			'saturday',
		])

		expect(result).toEqual(expected)
		expect(result).toHaveLength(expected.length)
	})

	it('should return empty array when the is only one timestamp that fits the schema', () => {
		const timestamps = [
			'2023-01-03',
			'2023-01-05',
			'2023-01-06',
			'2023-01-09',
			'2023-01-12',
			'2023-01-19',
		].map((date) => new Date(date))
		const result = getExtraStreakDaysForSpecificDays(timestamps, [
			'monday',
			'saturday',
		])

		expect(result).toHaveLength(0)
	})
})

describe('calculateAllStreaks, habits that are due daily', () => {
	it('should count streaks if there is one streak only', () => {
		const timestamps = [
			'2023-01-08',
			'2023-01-07',
			'2023-01-06',
			'2023-01-05',
			'2023-01-04',
			'2023-01-03',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(timestamps, { type: 'every_day' }, true)
		const streak = result[0]

		expect(result).toHaveLength(1)
		expect(streak).toHaveProperty('length', 6)
		expect(streak).toHaveProperty('start', '2023-01-03')
		expect(streak).toHaveProperty('end', '2023-01-08')
	})

	it('should count streaks if there are more streaks', () => {
		const timestamps = [
			'2023-01-14',
			'2023-01-13',
			'2023-01-12',
			'2023-01-11',
			'2023-01-08',
			'2023-01-07',
			'2023-01-06',
			'2023-01-05',
			'2023-01-04',
			'2023-01-03',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(timestamps, { type: 'every_day' }, true)
		const firstStreak = result[0]
		const secondStreak = result[1]

		expect(result).toHaveLength(2)
		expect(firstStreak).toHaveProperty('length', 6)
		expect(firstStreak).toHaveProperty('start', '2023-01-03')
		expect(firstStreak).toHaveProperty('end', '2023-01-08')
		expect(secondStreak).toHaveProperty('length', 4)
		expect(secondStreak).toHaveProperty('start', '2023-01-11')
		expect(secondStreak).toHaveProperty('end', '2023-01-14')
	})

	it('should return empty array when there are no streaks', () => {
		const timestamps = ['2023-01-14', '2023-01-12', '2023-01-08'].map(
			(date) => new Date(date),
		)

		const result = calculateAllStreaks(timestamps, { type: 'every_day' }, true)

		expect(result).toHaveLength(0)
	})
})

describe('calculateAllStreaks, habits that are due every_x_days', () => {
	it('should count streaks if there is one streak only', () => {
		const timestamps = [
			'2023-01-08',
			'2023-01-06',
			'2023-01-04',
			'2023-01-02',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'every_x_days', step: 2 },
			true,
		)
		const streak = result[0]

		expect(result).toHaveLength(1)
		expect(streak).toHaveProperty('length', 4)
		expect(streak).toHaveProperty('start', '2023-01-02')
		expect(streak).toHaveProperty('end', '2023-01-08')
	})

	it('should count streaks if there are more streaks', () => {
		const timestamps = [
			'2023-01-17',
			'2023-01-15',
			'2023-01-13',
			'2023-01-09',
			'2023-01-07',
			'2023-01-05',
			'2023-01-03',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'every_x_days', step: 2 },
			true,
		)
		const firstStreak = result[0]
		const secondStreak = result[1]

		expect(result).toHaveLength(2)
		expect(firstStreak).toHaveProperty('length', 4)
		expect(firstStreak).toHaveProperty('start', '2023-01-03')
		expect(firstStreak).toHaveProperty('end', '2023-01-09')
		expect(secondStreak).toHaveProperty('length', 3)
		expect(secondStreak).toHaveProperty('start', '2023-01-13')
		expect(secondStreak).toHaveProperty('end', '2023-01-17')
	})

	it('should count streaks if there are more streaks with extra days in between', () => {
		const timestamps = [
			'2023-01-23',
			'2023-01-19',
			'2023-01-15',
			'2023-01-11',
			'2023-01-06',
			'2023-01-05',
			'2023-01-01',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'every_x_days', step: 4 },
			true,
		)

		// they are sorted by length, so we need to sort the back by date
		const sortedResult = result.sort((streakA, streakB) => {
			return isBefore(new Date(streakA.start), new Date(streakB.start)) ? -1 : 1
		})
		const firstStreak = sortedResult[0]
		const secondStreak = sortedResult[1]

		expect(result).toHaveLength(2)
		expect(firstStreak).toHaveProperty('length', 3)
		expect(firstStreak).toHaveProperty('start', '2023-01-01')
		expect(firstStreak).toHaveProperty('end', '2023-01-06')
		expect(secondStreak).toHaveProperty('length', 4)
		expect(secondStreak).toHaveProperty('start', '2023-01-11')
		expect(secondStreak).toHaveProperty('end', '2023-01-23')
	})

	it('should return empty array when there are no streaks', () => {
		const timestamps = ['2023-01-14', '2023-01-10', '2023-01-05'].map(
			(date) => new Date(date),
		)

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'every_x_days', step: 2 },
			true,
		)

		expect(result).toHaveLength(0)
	})
})

describe('calculateAllStreaks, habits that are due every_workday', () => {
	it('should count streaks if there is one streak only', () => {
		const timestamps = [
			'2023-01-10',
			'2023-01-09',
			'2023-01-06',
			'2023-01-05',
			'2023-01-04',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'every_workday' },
			true,
		)
		const streak = result[0]

		expect(result).toHaveLength(1)
		expect(streak).toHaveProperty('length', 5)
		expect(streak).toHaveProperty('start', '2023-01-04')
		expect(streak).toHaveProperty('end', '2023-01-10')
	})

	it('should count streaks if there are more streaks', () => {
		const timestamps = [
			'2023-01-20',
			'2023-01-19',
			'2023-01-18',
			'2023-01-17',
			'2023-01-14',
			'2023-01-13',
			'2023-01-12',
			'2023-01-10',
			'2023-01-09',
			'2023-01-06',
			'2023-01-05',
			'2023-01-04',
			'2023-01-03',
			'2023-01-02',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'every_workday' },
			true,
		)

		//let's sort them by length

		const longestStreak = result[0]
		const secondLongestStreak = result[1]
		const shortedStreak = result[2]

		expect(result).toHaveLength(3)
		expect(longestStreak).toHaveProperty('length', 7)
		expect(longestStreak).toHaveProperty('start', '2023-01-02')
		expect(longestStreak).toHaveProperty('end', '2023-01-10')
		expect(secondLongestStreak).toHaveProperty('length', 4)
		expect(secondLongestStreak).toHaveProperty('start', '2023-01-17')
		expect(secondLongestStreak).toHaveProperty('end', '2023-01-20')
		expect(shortedStreak).toHaveProperty('length', 3)
		expect(shortedStreak).toHaveProperty('start', '2023-01-12')
		expect(shortedStreak).toHaveProperty('end', '2023-01-14')
	})

	it('should return empty array when there are no streaks', () => {
		const timestamps = ['2023-01-16', '2023-01-19', '2023-01-25'].map(
			(date) => new Date(date),
		)

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'every_workday' },
			true,
		)

		expect(result).toHaveLength(0)
	})
})

describe('calculateAllStreaks, habits that are due specific_days', () => {
	it('should count streaks if there is one streak only', () => {
		const timestamps = ['2023-01-02', '2023-01-04', '2023-01-09'].map(
			(date) => new Date(date),
		)

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'specific_days', days: ['monday', 'wednesday'] },
			true,
		)

		const streak = result[0]

		expect(result).toHaveLength(1)
		expect(streak).toHaveProperty('length', 3)
		expect(streak).toHaveProperty('start', '2023-01-02')
		expect(streak).toHaveProperty('end', '2023-01-09')
	})

	it('should count streaks if there are more streaks', () => {
		const timestamps = [
			'2023-01-27',
			'2023-01-24',
			'2023-01-13',
			'2023-01-10',
			'2023-01-08',
			'2023-01-06',
			'2023-01-03',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'specific_days', days: ['tuesday', 'friday', 'sunday'] },
			true,
		)
		const firstStreak = result[0]
		const secondStreak = result[1]

		expect(result).toHaveLength(2)
		expect(firstStreak).toHaveProperty('length', 5)
		expect(firstStreak).toHaveProperty('start', '2023-01-03')
		expect(firstStreak).toHaveProperty('end', '2023-01-13')
		expect(secondStreak).toHaveProperty('length', 2)
		expect(secondStreak).toHaveProperty('start', '2023-01-24')
		expect(secondStreak).toHaveProperty('end', '2023-01-27')
	})

	it('should count streaks if there are  extra days in between and omit them from count', () => {
		const timestamps = [
			'2023-01-17',
			'2023-01-16',
			'2023-01-11',
			'2023-01-10',
			'2023-01-09',
			'2023-01-04',
			'2023-01-02',
		].map((date) => new Date(date))

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'specific_days', days: ['monday', 'wednesday'] },
			true,
		)

		const streak = result[0]

		expect(result).toHaveLength(1)
		expect(streak).toHaveProperty('length', 5)
		expect(streak).toHaveProperty('start', '2023-01-02')
		expect(streak).toHaveProperty('end', '2023-01-16')
	})

	it('should return empty array when there are no streaks', () => {
		const timestamps = ['2023-01-03', '2023-01-06', '2023-01-07'].map(
			(date) => new Date(date),
		)

		const result = calculateAllStreaks(
			timestamps,
			{ type: 'specific_days', days: ['monday', 'wednesday'] },
			true,
		)

		expect(result).toHaveLength(0)
	})
})
