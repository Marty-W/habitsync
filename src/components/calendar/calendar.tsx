import { isToday } from 'date-fns'
import useCalendarData from '../../hooks/useCalendar'
import { DAYS } from '../../lib/const'
import DayCell from './dayCell'
import MonthSwitcher from './monthSwitcher'

interface CalendarProps {
  timestamps: Set<string>
}

const Calendar = ({ timestamps }: CalendarProps) => {
  const { year, month, calendarData, handleAddMonth, handleSubMonth } =
    useCalendarData()

  return (
    <div className='flex flex-col rounded-xl bg-slate-50 p-5'>
      <MonthSwitcher
        month={month}
        year={year}
        increment={handleAddMonth}
        decrement={handleSubMonth}
      />
      <div className='grid h-8 grid-cols-7 justify-items-center'>
        {DAYS.map((day, key) => (
          <span key={`${day}-${key}`} className='text-zinc-500'>
            {day}
          </span>
        ))}
      </div>
      <div className={`grid flex-1  grid-cols-7 place-items-center gap-2`}>
        {calendarData &&
          calendarData.calendarData.map(({ day, isThisMonth }, i) => {
            const exactDate = new Date(year, month, day)
            return (
              <DayCell
                date={day}
                isThisMonth={isThisMonth}
                hasTimestamp={timestamps.has(exactDate.toDateString())}
                isToday={isToday(exactDate)}
                key={i}
              />
            )
          })}
      </div>
    </div>
  )
}

export default Calendar
