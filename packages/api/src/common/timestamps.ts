import {
	endOfWeek,
	format,
	startOfMonth,
	startOfWeek,
	startOfYear,
} from 'date-fns'

export const groupTimestamps = (timestamps: string[]) => {
	const groupedByWeek: Record<string, number> = {}
	const groupedByMonth: Record<string, number> = {}
	const groupedByYear: Record<string, number> = {}

	timestamps.forEach((timestamp) => {
		const weekKeyStart = format(
			startOfWeek(new Date(timestamp), { weekStartsOn: 1 }),
			'yyyy-MM-dd',
		)
		const weekKeyEnd = format(
			endOfWeek(new Date(weekKeyStart), { weekStartsOn: 1 }),
			'yyyy-MM-dd',
		)

		const weekKey = `${format(new Date(weekKeyStart), 'd. M.')} - ${format(
			new Date(weekKeyEnd),
			'd. M.',
		)}`

		const monthKey = format(startOfMonth(new Date(timestamp)), 'MMM yyyy')
		const yearKey = format(startOfYear(new Date(timestamp)), 'yyyy')

		groupedByWeek[weekKey] = (groupedByWeek[weekKey] ?? 0) + 1
		groupedByMonth[monthKey] = (groupedByMonth[monthKey] ?? 0) + 1
		groupedByYear[yearKey] = (groupedByYear[yearKey] ?? 0) + 1
	})

	return {
		groupedByWeek,
		groupedByMonth,
		groupedByYear,
	}
}

const transformForChart = (data: Record<string, number>, label: string) => {
	return Object.entries(data).map(([key, value]) => ({
		name: key,
		[label]: value,
	}))
}

export const transformTimestampsToChartData = (
	groupedTimestamps: ReturnType<typeof groupTimestamps>,
) => {
	const weekChartData = transformForChart(
		groupedTimestamps.groupedByWeek,
		'Week completions',
	)
	const monthChartData = transformForChart(
		groupedTimestamps.groupedByMonth,
		'Month completions',
	)
	const yearChartData = transformForChart(
		groupedTimestamps.groupedByYear,
		'Year completions',
	)

	return {
		weekChartData,
		monthChartData,
		yearChartData,
	}
}
