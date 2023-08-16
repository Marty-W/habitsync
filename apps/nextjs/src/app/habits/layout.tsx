'use client'

import { usePathname } from 'next/navigation'

import DesktopTopBar from '~/components/dashboard/desktopTopBar'

interface Props {
	links: React.ReactNode
	dashboard: React.ReactNode
	settingsmodal: React.ReactNode
}
export default function Layout({ links, dashboard, settingsmodal }: Props) {
	const pathname = usePathname()
	const isDetailedView = pathname?.includes('/habits/')

	return (
		<div className="flex max-h-screen flex-col md:grid md:grid-cols-[0.5fr_1fr]">
			{/* For Mobile */}
			<div className="md:hidden">{isDetailedView ? dashboard : links}</div>

			{/* For Desktop */}
			<div className="bg-smuted hidden px-6 md:block">
				<div className="divide-smuted-foreground/20 flex flex-col divide-y-2 divide-opacity-20">
					<DesktopTopBar />
					<div className="hidden md:block">{links}</div>
				</div>
			</div>
			<div className="hidden md:block">{dashboard}</div>
			{settingsmodal}
		</div>
	)
}
