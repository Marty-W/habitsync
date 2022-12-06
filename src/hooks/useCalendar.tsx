import { isSameMonth } from 'date-fns'
import { useEffect, useState } from 'react'
import { generateCalendarInterval } from '../lib/date'
import { SortedMonthInterval } from '../types'

const useCalendar = (calendarStart: string) => {
  const [calendarData] = useState<SortedMonthInterval>(() => {
    try {
      const lastMonthSavedOn = localStorage.getItem('lastMonth')
      const savedCalendar = localStorage.getItem('calendarData')
      const noCalSaved = lastMonthSavedOn === null || savedCalendar === null

      if (noCalSaved || !isSameMonth(new Date(lastMonthSavedOn), new Date())) {
        return generateCalendarInterval(new Date(calendarStart), new Date())
      }

      return JSON.parse(savedCalendar)
    } catch (err) {
      console.log(err)
    }
  })

  useEffect(() => {
    localStorage.setItem('calendarData', JSON.stringify(calendarData))
    localStorage.setItem('lastMonth', new Date().toString())
  }, [calendarData])

  return calendarData
}

export default useCalendar
