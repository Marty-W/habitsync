import { api } from '~/utils/trpc'

const useCompletionPillsData = ({ habitId }: { habitId: string }) => {
	const timestamps = api.timestamp.getAllWithStreakDays.useQuery({
		habitId,
	})
	const habitDetail = api.habit.getDetail.useQuery({
		id: habitId,
	})

	return {
		timestamps,
		habitDetail,
	}
}

export default useCompletionPillsData
