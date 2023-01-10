import { Weekday } from 'types'
import {
  getExtraStreakDaysForSpecificDays,
  getExtraStreakDaysForStepDays,
  getExtraStreakDaysForWorkdays,
} from './streaks'

describe('getExtraStreakDays for "every_workday"', () => {
  it('should return weekend in extra days if timestamps include friday and monday', () => {
    const timestamps = ['2023-01-05', '2023-01-06', '2023-01-09'].map(
      (date) => new Date(date)
    )
    const expected = ['2023-01-07', '2023-01-08']
    const result = getExtraStreakDaysForWorkdays(timestamps)

    expect(result).toEqual(expected)
    expect(result).toHaveLength(2)
  })
  it('should return empty array if timestamps include friday and lack monday', () => {
    const timestamps = ['2023-01-05', '2023-01-06', '2023-01-10'].map(
      (date) => new Date(date)
    )
    const result = getExtraStreakDaysForWorkdays(timestamps)

    expect(result).toHaveLength(0)
  })
})

describe('getExtraStreakDays for "every_x_days"', () => {
  it('should return intervals between two timestamps that are exactly recurrence_step between', () => {
    const timestamps = ['2023-01-05', '2023-01-07', '2023-01-09'].map(
      (date) => new Date(date)
    )
    const expected = ['2023-01-06', '2023-01-08']
    const result = getExtraStreakDaysForStepDays(timestamps, 2)

    expect(result).toEqual(expected)
    expect(result).toHaveLength(2)
  })

  it('should work with longer periods between', () => {
    const timestamps = ['2023-01-05', '2023-01-10', '2023-01-15'].map(
      (date) => new Date(date)
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
      recurrence_days as Weekday[]
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
