import { useEffect, useState } from 'react'
import { addMonths, subMonths } from 'date-fns'

import { generateCalendarMonth } from '@habitsync/lib'

const useCalendarData = (initialYear?: number, initialMonth?: number) => {
	const [displayedDate, setDisplayedDate] = useState(() => {
		return initialYear && initialMonth
			? new Date(initialYear, initialMonth)
			: new Date()
	})
	const [calendarData, setCalendarData] =
		useState<ReturnType<typeof generateCalendarMonth>>()

	useEffect(() => {
		const year = displayedDate.getFullYear()
		const month = displayedDate.getMonth()

		const data = localStorage.getItem(`${year}-${month}`)

		if (!data) {
			const data = generateCalendarMonth(year, month)
			localStorage.setItem(`${year}-${month}`, JSON.stringify(data))
			setCalendarData(data)
		} else {
			//eslint-disable-next-line
			setCalendarData(JSON.parse(data))
		}
	}, [displayedDate])

	const handleSubMonth = () => {
		const newDate = subMonths(displayedDate, 1)
		setDisplayedDate(newDate)
	}

	const handleAddMonth = () => {
		const newDate = addMonths(displayedDate, 1)
		setDisplayedDate(newDate)
	}

	return {
		month: displayedDate.getMonth(),
		year: displayedDate.getFullYear(),
		calendarData: calendarData ?? [],
		handleAddMonth,
		handleSubMonth,
	}
}

export default useCalendarData
