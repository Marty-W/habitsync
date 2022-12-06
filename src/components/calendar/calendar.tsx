import { isSameDay } from 'date-fns'
import { useState } from 'react'
import useCalendar from '../../hooks/useCalendar'
import { DAYS } from '../../lib/const'
import { getNumCalRows } from '../../lib/date'
import MonthSwitcher from './monthSwitcher'

interface CalendarProps {
  timestamps: Set<string>
}

const Calendar = ({ timestamps }: CalendarProps) => {
  const calendarData = useCalendar([...timestamps][0])
  const today = new Date()
  //TODO add year+month to reducer
  const [selectedMonth, setSelectedMonth] = useState<number>(
    today.getMonth() + 1
  )
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear())
  //TODO add useMemo to prevent re-calculating
  const numberOfRows = getNumCalRows(new Date(selectedYear, selectedMonth))
  const activeMonth = calendarData[selectedYear]?.[selectedMonth]

  const incrementMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
    } else {
      setSelectedMonth(selectedMonth + 1)
    }
  }

  const decrementMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
    } else {
      setSelectedMonth(selectedMonth - 1)
    }
  }

  return (
    <div className='flex flex-col rounded-xl bg-slate-100 p-5'>
      <div className='grid h-8 grid-cols-7 justify-items-center'>
        {DAYS.map((day, key) => (
          <span key={`${day}-${key}`} className='text-zinc-500'>
            {day}
          </span>
        ))}
      </div>
      <div
        className={`grid grid-cols-7 ${
          numberOfRows === 5 ? 'grid-rows-5' : 'grid-rows-6'
        } flex-1 place-items-center gap-2`}
      >
        {calendarData &&
          activeMonth.map(({ thisMonth, dayDate }, i) => {
            return (
              <div
                key={i}
                className={`flex w-10 items-center justify-center rounded-md ${
                  thisMonth ? 'border-2' : 'border-0'
                } border-slate-400 p-1 ${
                  isSameDay(new Date(dayDate), today)
                    ? 'bg-blue-600'
                    : 'bg-slate-50'
                }`}
              >
                <span
                  className={`${
                    timestamps.has(dayDate) && thisMonth
                      ? 'bg-red-500'
                      : 'bg-transparent'
                  } ${thisMonth ? 'text-zinc-800' : 'text-zinc-400'}`}
                >
                  {new Date(dayDate).getDate()}
                </span>
              </div>
            )
          })}
      </div>
      <MonthSwitcher
        month={selectedMonth}
        year={selectedYear}
        increment={incrementMonth}
        decrement={decrementMonth}
      />
    </div>
  )
}

export default Calendar
