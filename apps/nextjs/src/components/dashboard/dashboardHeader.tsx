import useTimeSensitiveGreeting from '~/hooks/useTimeSensitiveGreeting'
import SettingsButton from '../settingsButton'
import ThemeToggle from '../ui/themeToggle'

const DashboardHeader = () => {
	const greeting = useTimeSensitiveGreeting()

	return (
		<div className="mb-10 flex items-end justify-between py-7">
			<h1 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl text-transparent">
				{greeting}
			</h1>
			<div className="flex justify-end">
				<ThemeToggle />
				<SettingsButton className="ml-2 justify-self-end" from="habits" />
			</div>
		</div>
	)
}

export default DashboardHeader
