'use client'

import { useSelectedLayoutSegment } from 'next/navigation'

import DashboardGraphic from './dashboardGraphic'

const DesktopDashboardView = () => {
	const activeSegment = useSelectedLayoutSegment()
	const isOnDetail = activeSegment

	if (isOnDetail) return null
	return (
		<div className="flex h-2/3 flex-col items-center justify-center">
			<h2 className="mb-10 text-3xl font-semibold">Welcome to HabitSync!</h2>
			<DashboardGraphic className="mb-10" />
			<p className="text-lg">
				Click on a habit from the list to view details and track your progress.
			</p>
		</div>
	)
}

export default DesktopDashboardView
