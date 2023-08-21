'use client'

import { usePathname } from 'next/navigation'

import DesktopTopBar from '~/components/dashboard/desktopTopBar'
import HabitList from '~/components/dashboard/habitList'
import DesktopDashboardView from '~/components/ui/desktopDashboardView'

interface Props {
	children: React.ReactNode
}
export default function Layout({ children }: Props) {
	const pathname = usePathname()
	const isEmptyDashboard = pathname === '/habits'

	return (
		<div className="flex max-h-screen flex-col lg:grid lg:grid-cols-[0.4fr_1fr]">
			{/* For Mobile */}
			<div className="md:px-6 lg:hidden">{children}</div>

			{/* For Desktop */}
			<div className="bg-smuted hidden px-6 shadow-lg lg:block">
				<div className="divide-smuted-foreground/20 flex h-screen flex-col divide-y-2 divide-opacity-20">
					<DesktopTopBar />
					<HabitList />
				</div>
			</div>
			<div className="my-auto hidden lg:col-start-2 lg:block">
				{isEmptyDashboard ? <DesktopDashboardView /> : children}
			</div>
		</div>
	)
}
