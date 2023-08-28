import { redirect } from 'next/navigation'

import { auth } from '@habitsync/auth'

import DashboardHeader from '~/components/dashboard/dashboardHeader'
import HabitList from '~/components/dashboard/habitList'

const Habits = async () => {
	const session = await auth()

	if (!session) {
		redirect('/api/auth/signin/')
	}

	return (
		<div className="flex flex-col py-6 max-md:container">
			<DashboardHeader />
			<HabitList />
		</div>
	)
}

export default Habits
