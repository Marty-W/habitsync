import { Streak } from 'types'
import { differenceInDays, isToday, isYesterday } from 'date-fns'
import { areDaysConsecutive } from 'lib/date'

export const calculateAllStreaks = (dates: Date[]) => {
  return dates
    .reduce((streaks: Streak[], timestamp, idx, arr) => {
      const prevTimestamp = arr[idx - 1]

      if (idx === 0 || !areDaysConsecutive(prevTimestamp, timestamp)) {
        streaks.push({
          start: timestamp.toString(),
          end: timestamp.toString(),
          length: 1,
        })
        return streaks
      }

      const lastStreak = streaks[streaks.length - 1]

      if (areDaysConsecutive(prevTimestamp, timestamp)) {
        lastStreak.length++
        lastStreak.start = timestamp.toString()
      } else {
        lastStreak.start = timestamp.toString()
        streaks.push(lastStreak)
      }

      return streaks
    }, [])
    .filter((streak) => streak.length > 1)
    .sort((a, b) => b.length - a.length)
}

export const calculateCurrentStreak = (dates: Date[]) => {
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
