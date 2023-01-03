import { isToday } from 'date-fns'
import { animate, motion, useAnimationControls } from 'framer-motion'
import useCalendarData from 'hooks/useCalendar'
import { DAYS } from 'lib/const'
import { RouterOutput } from 'lib/trpc'
import DayCell from './dayCell'
import MonthSwitcher from './monthSwitcher'
import { MotionConfig } from 'framer-motion'
import ResizableSlidePanel from 'components/ui/resizablePanel'
import { useState } from 'react'

interface Props {
  timestamps: RouterOutput['timestamp']['getAll']
}

const Calendar = ({ timestamps }: Props) => {
  const { year, month, calendarData, handleAddMonth, handleSubMonth } =
    useCalendarData()
  const [animationDirection, setAnimationDirection] = useState<
    'left' | 'right' | undefined
  >()

  const handleMonthChange = (type: 'addMonth' | 'subMonth') => {
    if (type === 'addMonth') {
      setAnimationDirection('right')
      handleAddMonth()
    } else {
      setAnimationDirection('left')
      handleSubMonth()
    }
  }

  return (
    <div className='flex flex-col'>
      <MonthSwitcher
        month={month}
        year={year}
        handleMonthChange={handleMonthChange}
      />
      <div className='grid h-10 grid-cols-7 justify-items-center'>
        {DAYS.map((day, key) => (
          <span key={`${day}-${key}`} className='text-zinc-300'>
            {day}
          </span>
        ))}
      </div>
      <ResizableSlidePanel duration={0.5} slideDirection={animationDirection}>
        <div className='grid flex-1 grid-cols-7 place-items-center gap-x-1 gap-y-4'>
          {calendarData?.length &&
            calendarData.map((dateStr, i) => {
              const date = new Date(dateStr)
              return (
                <DayCell
                  date={date.getDate()}
                  isThisMonth={month === date.getMonth()}
                  hasTimestamp={timestamps.has(date.toDateString())}
                  isToday={isToday(date)}
                  key={i}
                />
              )
            })}
        </div>
      </ResizableSlidePanel>
    </div>
  )
}

export default Calendar
