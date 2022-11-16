import { useState } from 'react'
import { DAYS } from '../../const/date'
import { CalendarData } from '../../types'
import {
  generateCalendarData,
  getMaxDate,
  getMinDate,
  getNumCalRows,
} from '../../utils/date'
import MonthSwitcher from './monthSwitcher'

interface CalendarProps {
  timestamps?: CalendarData
}

const Calendar = ({ timestamps }: CalendarProps) => {
  const today = new Date()
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth())
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear())
  const numberOfRows = getNumCalRows(new Date(selectedYear, selectedMonth))
  const startDate = getMinDate(timestamps)
  const endDate = getMaxDate(timestamps)

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
    <div className='flex h-full w-full max-w-lg flex-col  rounded-xl bg-slate-300 p-5'>
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
        {/* {data.map((day, i) => {
          return (
            <div
              key={i}
              className={`flex w-10 items-center justify-center rounded-md ${
                day.thisMonth ? 'border-2' : 'border-0'
              } border-slate-400 p-1 ${
                day.day === today.getDate() ? 'bg-blue-600' : 'bg-slate-50'
              }`}
            >
              <span
                className={`${day.done ? 'bg-red-500' : 'bg-transparent'} ${
                  day.thisMonth ? 'text-zinc-800' : 'text-zinc-400'
                }`}
              >
                {day.day}
              </span>
            </div>
          )
        })} */}
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
