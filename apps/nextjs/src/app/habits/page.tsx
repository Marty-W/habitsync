import DashboardHeader from '~/components/dashboard/dashboardHeader'
import HabitList from '~/components/dashboard/habitList'

const Habits = () => {
	return (
		<div className="container flex min-h-screen flex-col py-6">
			<DashboardHeader />
			<HabitList />
		</div>
	)
}

export default Habits
