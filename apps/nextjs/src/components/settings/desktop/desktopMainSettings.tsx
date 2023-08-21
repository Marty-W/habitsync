import { Eraser, Hash, LogOut, Palette, Tags } from 'lucide-react'
import { signOut } from 'next-auth/react'

import InfoDialog from '~/components/ui/infoDialog'
import ThemeSelect from '~/components/ui/themeSelect'
import DeleteAccountItem from '../deleteAccountItem'
import SettingsItem from '../settingsItem'
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
				<SettingsItem
					title="From Projects"
					as="button"
					Icon={Hash}
					onClick={() => changeView('sync-projects')}
				/>
				<SettingsItem
					title="From Labels"
					as="button"
					Icon={Tags}
					onClick={() => changeView('sync-labels')}
				/>
			</SettingsSection>
			<SettingsSection title="App">
				<SettingsItem
					title="Delete timestamps or habits"
					as="button"
					Icon={Eraser}
					onClick={() => changeView('edit-habits')}
				/>
				<SettingsItem title="Prefered theme" as="button" Icon={Palette}>
					<ThemeSelect />
				</SettingsItem>
			</SettingsSection>
			<SettingsSection title="Account">
				<SettingsItem
					title="Log out"
					as="button"
					onClick={() => signOut({ callbackUrl: '/' })}
					Icon={LogOut}
				/>
				<DeleteAccountItem />
			</SettingsSection>
		</div>
	)
}

export default DesktopMainSettings
