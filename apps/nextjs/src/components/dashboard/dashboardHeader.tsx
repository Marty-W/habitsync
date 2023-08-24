import SettingsButton from '../settingsButton'
import Greeting from '../ui/greeting'
import ThemeToggle from '../ui/themeToggle'

const DashboardHeader = () => {
	return (
		<div className="mb-10 flex items-end justify-between py-7 lg:hidden">
			<Greeting />
			<div className="flex justify-end">
				<ThemeToggle />
				<SettingsButton
					className="ml-2 justify-self-end"
					from="habits"
					link="/settings"
				/>
			</div>
		</div>
	)
}

export default DashboardHeader
