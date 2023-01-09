import { createRandomTimestamps } from '@/lib/testFactory'
import { eachDayOfInterval } from 'date-fns'
import {
  getNumberOfDaysInInterval,
  getNumberOfTimestampsInInterval,
  getSuccessRate,
  getWeekdayIndexes,
} from './recurrence'

describe('getWeekdayIndexes', () => {
  it('should return the correct indexes', () => {
    expect(getWeekdayIndexes(['monday', 'wednesday', 'friday'])).toStrictEqual([
      1, 3, 5,
    ])
  })
})

describe('getNumberOfDaysInInterval', () => {
  test('returns correct number of days for daily habits', () => {
    const interval = {
      start: new Date('2022-01-01'),
      end: new Date('2022-01-07'),
    }

    expect(getNumberOfDaysInInterval(interval, 'every_day')).toBe(7)
  })

  test('returns correct number of weekdays', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(getNumberOfDaysInInterval(interval, 'every_workday')).toBe(22)
  })

  test('returns correct number of days for "every two days" habits', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-09'),
    }

    expect(
      getNumberOfDaysInInterval(interval, 'every_x_days', { step: 2 })
    ).toBe(5)
  })

  test('returns correct number of days for "every 5 days" habits', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(
      getNumberOfDaysInInterval(interval, 'every_x_days', { step: 5 })
    ).toBe(7)
  })

  test('throws an erorr when the habit is "every_x_days" and step is not provided', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(() => getNumberOfDaysInInterval(interval, 'every_x_days')).toThrow()
  })

  test('throws an erorr when the habit is "specific_days" and days are not provided', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(() =>
      getNumberOfDaysInInterval(interval, 'specific_days', {})
    ).toThrow()
  })

  test('throws an erorr when the habit is "specific_days" and days are not empty', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(() =>
      getNumberOfDaysInInterval(interval, 'specific_days', { days: [] })
    ).toThrow()
  })

  test('returns correct number of days for "specific_days" habits', () => {
    const interval = {
      start: new Date('2023-01-01'),
      end: new Date('2023-01-31'),
    }

    expect(
      getNumberOfDaysInInterval(interval, 'specific_days', {
        days: ['monday', 'wednesday', 'friday'],
      })
    ).toBe(13)
  })
})

describe('getNumberOfTimestampsInInterval', () => {
  test('returns correct number of timestamps', () => {
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
  test('returns correct success rate', () => {
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
