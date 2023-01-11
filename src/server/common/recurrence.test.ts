import { createRandomTimestamps } from '@/lib/testFactory'
import { eachDayOfInterval } from 'date-fns'
import {
  getNumberOfDaysInInterval,
  getNumberOfTimestampsInInterval,
  getRecurrenceStep,
  getRecurrenceType,
  getSpecificRecurrenceDays,
  getSuccessRate,
  getWeekdayIndexes,
} from './recurrence'
import { describe, it, expect } from 'vitest'

describe('getRecurrenceType', () => {
  it('should return "every_day" if the input is "every day"', () => {
    const result = getRecurrenceType('every day')
    expect(result).toBe('every_day')
  })

  it('should return "every_workday" if the input is "every workday"', () => {
    const result = getRecurrenceType('every workday')
    expect(result).toBe('every_workday')
  })

  it('should return "every_x_days" if the input is "every other day"', () => {
    const result = getRecurrenceType('every other day')
    expect(result).toBe('every_x_days')
  })

  it('should return "every_x_days" if the input is "every 5 days"', () => {
    const result = getRecurrenceType('every 5 days')
    expect(result).toBe('every_x_days')
  })

  it('should return "every_x_days" if the input contains wordNumber => "every five days"', () => {
    const result = getRecurrenceType('every five days')
    expect(result).toBe('every_x_days')
  })

  it('should return "specific_days" if the input contains specific days', () => {
    const result = getRecurrenceType('every Monday, Tuesday and Wednesday')
    expect(result).toBe('specific_days')
  })
})

describe('getRecurenceStep', () => {
  it('should return 2 if the input is "every other day"', () => {
    const recurrenceString = 'every other day'
    const result = getRecurrenceStep(recurrenceString)

    expect(result).toBe(2)
  })

  it('should return 5 if the input is "every 5 days"', () => {
    const recurrenceString = 'every 5 days'
    const result = getRecurrenceStep(recurrenceString)

    expect(result).toBe(5)
  })

  it('should return 5 if the input is "every five days"', () => {
    const recurrenceString = 'every five days'
    const result = getRecurrenceStep(recurrenceString)

    expect(result).toBe(5)
  })
})

describe('getSpecificRecurrenceDays', () => {
  it('should return an array of weekdays if the input contains specific days', () => {
    const recurrenceString = 'every Monday, Tuesday and Wednesday'
    const result = getSpecificRecurrenceDays(recurrenceString)

    expect(result).toEqual(['monday', 'tuesday', 'wednesday'])
  })

  it('should return an array of weekdays if the input contains specific days in short form', () => {
    const recurrenceString = 'every Mon, Tue and Wed'
    const result = getSpecificRecurrenceDays(recurrenceString)

    expect(result).toEqual(['monday', 'tuesday', 'wednesday'])
  })
})

describe('getWeekdayIndexes', () => {
  it('should return the correct indexes', () => {
    expect(getWeekdayIndexes(['monday', 'wednesday', 'friday'])).toStrictEqual([
      1, 3, 5,
    ])
  })
})

describe('getNumberOfDaysInInterval', () => {
  it('returns correct number of days for daily habits', () => {
    const interval = {
      start: new Date('2022-01-01'),
      end: new Date('2022-01-07'),
    }

    expect(getNumberOfDaysInInterval(interval, { type: 'every_day' })).toBe(7)
  })

  it('returns correct number of weekdays', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(getNumberOfDaysInInterval(interval, { type: 'every_workday' })).toBe(
      22
    )
  })

  it('returns correct number of days for "every two days" habits', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-09'),
    }

    expect(
      getNumberOfDaysInInterval(interval, { type: 'every_x_days', step: 2 })
    ).toBe(5)
  })

  it('returns correct number of days for "every 5 days" habits', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(
      getNumberOfDaysInInterval(interval, { type: 'every_x_days', step: 5 })
    ).toBe(7)
  })

  it('returns correct number of days for "specific_days" habits', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(
      getNumberOfDaysInInterval(interval, {
        type: 'specific_days',
        days: ['monday', 'wednesday', 'friday'],
      })
    ).toBe(13)
  })
})

describe('getNumberOfTimestampsInInterval', () => {
  it('returns correct number of timestamps', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }
    const mockedTimestampsInInterval = createRandomTimestamps(
      interval.start,
      interval.end,
      20
    )
    const mockedTimestampsOutsideOfInterval = createRandomTimestamps(
      new Date('2023-02-01'),
      new Date('2023-02-28'),
      20
    )

    expect(
      getNumberOfTimestampsInInterval(
        [...mockedTimestampsInInterval, ...mockedTimestampsOutsideOfInterval],
        interval
      )
    ).toBe(20)
  })
})

describe('getSuccessRate', () => {
  it('returns correct success rate', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }
    const numberOfTimestamps = 20
    const numberOfDays = eachDayOfInterval(interval).length
    const expectedSuccessRate = ((20 / 31) * 100).toFixed(1)

    expect(getSuccessRate(numberOfTimestamps, numberOfDays)).toBe(
      expectedSuccessRate
    )
  })
})
