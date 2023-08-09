import { api } from '~/utils/trpc'

const useHabitDetailData = (habitId: string) => {
	const calendarData = api.timestamp.getAllWithStreakDays.useQuery({
		habitId,
	})
	const description = api.habit.getDetail.useQuery({
		id: habitId,
	})

	const streaks = api.streak.getBest.useQuery({ habitId, numStreaks: 5 })
	const totalCompletions = api.stats.getTotalHabitCompletions.useQuery({
		habitId,
	})

	const successRate = api.stats.getHabitSuccessRate.useQuery({
		habitId,
	})

	const timestampSummaryCounts = api.timestamp.getSummaryCounts.useQuery({
		habitId,
	})

	return {
		calendarData,
		description,
		streaks,
		totalCompletions,
		successRate,
		timestampSummaryCounts,
	}
}

export default useHabitDetailData
