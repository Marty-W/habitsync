import DashboardGraphic from '~/components/ui/dashboardGraphic'

const DefaultDetailView = () => {
	return (
		<div className="flex h-full flex-col items-center justify-center">
			<h2 className="mb-2 text-2xl font-semibold">Welcome to HabitSync!</h2>
			<DashboardGraphic className="stroke-slate-100" />
			<p className="text-lg">
				Click on a habit from the list to view details and track your progress.
			</p>
		</div>
	)
}

export default DefaultDetailView
