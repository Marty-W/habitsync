import { SettingsModalProvider } from '~/hooks/useSettingsModalContext'
import SettingsModal from '../settings/desktop/settingsModal'
import BrandIcon from '../ui/brandIcon'
import ThemeToggle from '../ui/themeToggle'

const DesktopTopBar = () => {
	return (
		<div className="flex items-end justify-between py-4">
			<div className="h-16 w-16">
				<BrandIcon />
			</div>
			<div className="flex space-x-2">
				<ThemeToggle />
				<SettingsModalProvider>
					<SettingsModal />
				</SettingsModalProvider>
			</div>
		</div>
	)
}

export default DesktopTopBar
