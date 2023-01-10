import { areDaysConsecutive, generateCalendarMonth } from './date'

describe('areDaysConsecutive', () => {
  it('should return true if days are consecutive', () => {
    const today = new Date()
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1))

    const result = areDaysConsecutive(today, tomorrow)
    expect(result).toBe(true)
  })

  it('should return false if days aren"t consecutive', () => {
    const today = new Date()
    const dayAfterTomorrow = new Date(new Date().setDate(today.getDate() + 2))

    const result = areDaysConsecutive(today, dayAfterTomorrow)
    expect(result).toBe(false)
  })
})

// describe('generateCalendarMonth', () => {
//   it('should return an array of with the length of the passed month-year', () => {
//     const month = 0
//     const year = 2023
//     const result = generateCalendarMonth(year, month)
//     expect(result.length).toBe(31)
//   })

// it('should return an array of 42 days starting on a Monday', () => {
//     const result = generateCalendarMonth(2020, 0)
//     expect(result[0].getDay()).toBe(1)
// })

// it('should return an array of 42 days ending on a Sunday', () => {
//     const result = generateCalendarMonth(2020, 0)
//     expect(result[41].getDay()).toBe(0)
// })
// })
