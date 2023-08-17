import DashboardHeader from '~/components/dashboard/dashboardHeader'
import HabitList from '~/components/dashboard/habitList'

const Habits = () => {
	return (
		<div className="flex flex-col py-6 max-md:container">
			<DashboardHeader />
			<HabitList />
		</div>
	)
}

export default Habits
