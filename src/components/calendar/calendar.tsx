import { isToday } from 'date-fns'
import { motion } from 'framer-motion'
import useCalendarData from '../../hooks/useCalendar'
import { DAYS } from '../../lib/const'
import { RouterOutput } from '../../lib/trpc'
import Card from '../card'
import ResizablePanel from '../resizablePanel'
import DayCell from './dayCell'
import MonthSwitcher from './monthSwitcher'

interface Props {
  timestamps: RouterOutput['timestamp']['getAll']
}

const Calendar = ({ timestamps }: Props) => {
  const { year, month, calendarData, handleAddMonth, handleSubMonth } =
    useCalendarData()

  return (
    <Card>
      <div className='flex flex-col'>
        <MonthSwitcher
          month={month}
          year={year}
          increment={handleAddMonth}
          decrement={handleSubMonth}
        />
        <div className='grid h-8 grid-cols-7 justify-items-center'>
          {DAYS.map((day, key) => (
            <span key={`${day}-${key}`} className='text-zinc-300'>
              {day}
            </span>
          ))}
        </div>
        <ResizablePanel>
          <motion.div
            className={`grid flex-1 grid-cols-7 place-items-center gap-3`}
          >
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
          </motion.div>
        </ResizablePanel>
      </div>
    </Card>
  )
}

export default Calendar
