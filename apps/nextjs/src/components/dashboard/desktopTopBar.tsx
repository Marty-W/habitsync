import { usePathname } from 'next/navigation'

import SettingsButton from '../settingsButton'
import BrandIcon from '../ui/brandIcon'
import ThemeToggle from '../ui/themeToggle'

const DesktopTopBar = () => {
	const pathname = usePathname()
	return (
		<div className="flex items-center justify-between py-6">
			<div className="h-16 w-16">
				<BrandIcon />
			</div>
			<div className="flex space-x-2">
				<ThemeToggle />
				<SettingsButton from={pathname ?? '/habits'} link="/settings" />
			</div>
		</div>
	)
}

export default DesktopTopBar
