'use client'

import DesktopTopBar from '~/components/dashboard/desktopTopBar'
import HabitList from '~/components/dashboard/habitList'
import DesktopDashboardView from '~/components/ui/desktopDashboardView'

interface Props {
	children: React.ReactNode
}
export default function Layout({ children }: Props) {
	return (
		<div className="flex max-h-screen flex-col md:grid md:grid-cols-[0.5fr_1fr]">
			{/* For Mobile */}
			<div className="md:hidden">{children}</div>

			{/* For Desktop */}
			<div className="bg-smuted hidden px-6 shadow-lg md:block">
				<div className="divide-smuted-foreground/20 flex h-screen flex-col divide-y-2 divide-opacity-20">
					<DesktopTopBar />
					<HabitList />
				</div>
			</div>
			<div className="hidden md:col-start-2 md:block">
				<DesktopDashboardView />
				{children}
			</div>
		</div>
	)
}
