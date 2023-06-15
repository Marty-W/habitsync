import {
  addDays,
  nextFriday,
  nextMonday,
  nextSaturday,
  nextSunday,
  nextTuesday,
  nextWednesday,
} from "date-fns"
import { describe, expect, it } from "vitest"

import { areDaysConsecutive } from "./date"

describe("areDaysConsecutive for recType=every_day", () => {
  it("should return true if days are consecutive", () => {
    const today = new Date()
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1))

    const result = areDaysConsecutive(today, tomorrow, { type: "every_day" })
    expect(result).toBe(true)
  })

  it('should return false if days aren"t consecutive', () => {
    const today = new Date()
    const dayAfterTomorrow = new Date(new Date().setDate(today.getDate() + 2))

    const result = areDaysConsecutive(today, dayAfterTomorrow, {
      type: "every_day",
    })
    expect(result).toBe(false)
  })
})

describe("areDaysConsecutive for recType=every_workday", () => {
  it("should return true if days are consecutive and there is no weekend", () => {
    const today = new Date()
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1))

    const result = areDaysConsecutive(today, tomorrow, {
      type: "every_workday",
    })
    expect(result).toBe(true)
  })
  it("should return true if days are friday and monday", () => {
    const friday = nextFriday(new Date())
    const monday = nextMonday(friday)

    const result = areDaysConsecutive(friday, monday, { type: "every_workday" })
    expect(result).toBe(true)
  })

  it("should return false if days arent consecutive", () => {
    const friday = nextFriday(new Date())
    const tuesday = nextTuesday(friday)

    const result = areDaysConsecutive(friday, tuesday, {
      type: "every_workday",
    })
    expect(result).toBe(false)
  })
})

describe("areDaysConsecutive for recType=every_x_days", () => {
  it("should return true if days are split by 2 days and step=2", () => {
    const today = new Date()
    const dayAfterTomorrow = new Date(new Date().setDate(today.getDate() + 2))

    const result = areDaysConsecutive(today, dayAfterTomorrow, {
      type: "every_x_days",
      step: 2,
    })
    expect(result).toBe(true)
  })

  it("should return true if days are one day after another and step=2", () => {
    const today = new Date()
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1))

    const result = areDaysConsecutive(today, tomorrow, {
      type: "every_x_days",
      step: 2,
    })
    expect(result).toBe(true)
  })

  it("should return true if days are 7 days apart and step=7", () => {
    const today = new Date()
    const dayAfterWeek = new Date(new Date().setDate(today.getDate() + 7))

    const result = areDaysConsecutive(today, dayAfterWeek, {
      type: "every_x_days",
      step: 7,
    })
    expect(result).toBe(true)
  })

  it("should return false if days arent consecutive", () => {
    const friday = nextFriday(new Date())
    const tuesday = new Date(new Date().setDate(friday.getDate() + 3))

    const result = areDaysConsecutive(friday, tuesday, {
      type: "every_x_days",
      step: 2,
    })
    expect(result).toBe(false)
  })
})

describe("areDaysConsecutive for recType=specific_days", () => {
  it("should return true if days are Monday and Friday and days=[`monday`, `friday`]", () => {
    const monday = nextMonday(new Date())
    const friday = nextFriday(monday)

    const result = areDaysConsecutive(monday, friday, {
      type: "specific_days",
      days: [`monday`, `friday`],
    })
    expect(result).toBe(true)
  })

  it("should return true if days are two Mondays week apart and days=[`monday`]", () => {
    const monday = nextMonday(new Date())
    const mondayAfterWeek = nextMonday(monday)

    const result = areDaysConsecutive(monday, mondayAfterWeek, {
      type: "specific_days",
      days: [`monday`],
    })
    expect(result).toBe(true)
  })

  it("should return false if days are Monday and Friday and days=[`tuesday`, `friday`]", () => {
    const monday = nextMonday(new Date())
    const friday = nextFriday(monday)

    const result = areDaysConsecutive(monday, friday, {
      type: "specific_days",
      days: [`tuesday`, `friday`],
    })
    expect(result).toBe(false)
  })

  it("should return false if days are two Mondays 2 weeks apart and days=[`monday`]", () => {
    const monday = nextMonday(new Date())
    const mondayAfterTwoWeeks = addDays(nextMonday(monday), 7)

    const result = areDaysConsecutive(monday, mondayAfterTwoWeeks, {
      type: "specific_days",
      days: [`monday`],
    })
    expect(result).toBe(false)
  })

  it("should return false if days are Monday and Friday days=[`tuesday`, `friday`], but the dates are not in the same week", () => {
    const monday = nextMonday(new Date())
    const friday = addDays(nextFriday(monday), 7)

    const result = areDaysConsecutive(monday, friday, {
      type: "specific_days",
      days: [`tuesday`, `friday`],
    })
    expect(result).toBe(false)
  })

  it("should return true if there are 3 days on recConfig", () => {
    const wednesday = nextWednesday(new Date())
    const friday = nextFriday(wednesday)

    const result = areDaysConsecutive(wednesday, friday, {
      type: "specific_days",
      days: [`monday`, `wednesday`, `friday`],
    })
    expect(result).toBe(true)
  })

  it("should return true if there are 4 days on recConfig", () => {
    const tuesday = nextTuesday(new Date())
    const saturday = nextSaturday(tuesday)

    const result = areDaysConsecutive(tuesday, saturday, {
      type: "specific_days",
      days: ["monday", "tuesday", "saturday", "sunday"],
    })
    expect(result).toBe(true)
  })

  it("should return false if there is a `skipped day` between days in reConfig", () => {
    const tuesday = nextTuesday(new Date())
    const sunday = nextSunday(tuesday)

    const result = areDaysConsecutive(tuesday, sunday, {
      type: "specific_days",
      days: ["monday", "tuesday", "saturday", "sunday"],
    })
    expect(result).toBe(false)
  })
})
