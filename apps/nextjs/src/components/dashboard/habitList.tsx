'use client'

import { api } from '~/utils/trpc'
import FetchError from '../ui/fetchError'
import Spinner from '../ui/spinner'
import DashboardHabit from './dashboardHabit'
import EmptyHabitState from './emptyHabitState'

const HabitList = () => {
	const allHabits = api.habit.getAll.useQuery(undefined, { retry: 0 })

	if (allHabits.isLoading) {
		return (
			<div className="text-smuted-foreground/40 flex flex-col items-center justify-center">
				<span className="my-3 text-xl">Getting your habits...</span>
				<Spinner size={90} />
			</div>
		)
	}

	if (allHabits.isError)
		return (
			<FetchError
				isRefetching={allHabits.isRefetching}
				refetch={allHabits.refetch}
			>
				<span>{allHabits.error.message}</span>
			</FetchError>
		)

	if (allHabits.data.length === 0) {
		return <EmptyHabitState />
	}

	return (
		<div className="flex flex-col space-y-2">
			{allHabits.data.map((habit) => {
				return <DashboardHabit key={habit.id} habit={habit} />
			})}
		</div>
	)
}

export default HabitList
