import { format, isThisYear, differenceInDays } from 'date-fns'
import { motion } from 'framer-motion'
type StreakMock = {
  start: string
  end: string
}

const streaksMock: StreakMock[] = [
  {
    start: new Date('2023-01-01').toString(),
    end: new Date('2023-01-03').toString(),
  },
  {
    start: new Date('2023-12-16').toString(),
    end: new Date('2023-12-29').toString(),
  },
  {
    start: new Date('2023-07-01').toString(),
    end: new Date('2023-08-31').toString(),
  },
  {
    start: new Date('2023-09-01').toString(),
    end: new Date('2023-10-01').toString(),
  },
]

const sortMockStreaks = (streaks: StreakMock[]) => {
  return streaks
    .map((streak) => {
      const start = new Date(streak.start)
      const end = new Date(streak.end)
      return {
        start,
        end,
        length: differenceInDays(end, start),
      }
    })
    .sort((a, b) => b.length - a.length)
}

interface Props {
  numStreaksToShow: number
}

const Streaks = ({ numStreaksToShow }: Props) => {
  const mocks = sortMockStreaks(streaksMock)

  if (numStreaksToShow) {
    mocks.length = numStreaksToShow
  }

  return (
    <div className='text-center'>
      <h1>Your best streaks</h1>
      <div className=''>
        {mocks.map((streak, index, arr) => {
          let timeFormat = 'MMM d'
          if (
            !isThisYear(new Date(streak.start)) ||
            !isThisYear(new Date(streak.end))
          ) {
            timeFormat = 'MMM d, yy'
          }
          const formattedStart = format(new Date(streak.start), timeFormat)
          const formattedEnd = format(new Date(streak.end), timeFormat)

          // I presume that the first streak is the longest one
          const maxStreak = arr[0].length

          const barWidth = (streak.length / maxStreak) * 100
          return (
            <div
              key={`${index}-${barWidth}`}
              className='my-4 grid grid-flow-row grid-cols-[70px_1fr_70px] items-center'
            >
              <span>{formattedStart}</span>
              <div
                className={`relative flex h-6 w-full items-center justify-center justify-self-center rounded-xl bg-slate-200 py-1`}
              >
                {/* FIX PLAY WITH THE DURATION */}
                <motion.div
                  style={{ minWidth: '30px' }}
                  className='rounded-xl bg-red-500'
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 3 }}
                >
                  <span className='text-slate-100'>{streak.length}</span>
                </motion.div>
                <span className='absolute right-2 text-xs text-slate-100'>
                  days
                </span>
              </div>
              <span>{formattedEnd}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Streaks
