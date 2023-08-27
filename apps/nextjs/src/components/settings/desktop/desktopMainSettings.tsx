import { Eraser, Hash, LogOut, Palette, Tags } from 'lucide-react'
import { signOut } from 'next-auth/react'

import InfoDialog from '~/components/ui/infoDialog'
import ThemeSelect from '~/components/ui/themeSelect'
import DeleteAccountItem from '../deleteAccountItem'
import { SettingsItem, SettingsItemButton } from '../settingsItem'
import SettingsSection from '../settingsSection'
import type { CurrentView } from './desktopWrapper'

interface Props {
	changeView: (view: CurrentView) => void
}

const DesktopMainSettings = ({ changeView }: Props) => {
	return (
		<div>
			<SettingsSection
				title="Sync"
				dialog={
					<InfoDialog
						header="Sync from Projects or Labels"
						text="Effortlessly import tasks from Todoist projects or labels. Select a project or label, and we'll fetch your tasks. Handpick the ones you want as habits, and we'll save them to your dashboard for easy tracking with insightful graphs."
					/>
				}
			>
				<SettingsItemButton
					title="From Projects"
					Icon={Hash}
					onClick={() => changeView('sync-projects')}
				/>
				<SettingsItemButton
					title="From Labels"
					Icon={Tags}
					onClick={() => changeView('sync-labels')}
				/>
			</SettingsSection>
			<SettingsSection title="App">
				<SettingsItemButton
					title="Delete timestamps or habits"
					Icon={Eraser}
					onClick={() => changeView('edit-habits')}
				/>
				<SettingsItem title="Prefered theme" Icon={Palette}>
					<ThemeSelect />
				</SettingsItem>
			</SettingsSection>
			<SettingsSection title="Account">
				<SettingsItemButton
					title="Log out"
					onClick={() => signOut({ callbackUrl: '/' })}
					Icon={LogOut}
				/>
				<DeleteAccountItem />
			</SettingsSection>
		</div>
	)
}

export default DesktopMainSettings
