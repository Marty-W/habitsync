'use client'

import { usePathname } from 'next/navigation'

interface Props {
	links: React.ReactNode
	dashboard: React.ReactNode
}
export default function Layout({ links, dashboard }: Props) {
	const pathname = usePathname()
	const isDetailedView = pathname?.includes('/habits/')

	return (
		<div className="flex max-h-screen flex-col md:grid md:grid-cols-[0.5fr_1fr]">
			{/* For Mobile */}
			<div className="md:hidden">{isDetailedView ? dashboard : links}</div>

			{/* For Desktop */}
			<div className="bg-smuted hidden px-6 pt-20 md:block">
				<div className="hidden md:block">{links}</div>
			</div>
			<div className="hidden md:block">{dashboard}</div>
		</div>
	)
}
