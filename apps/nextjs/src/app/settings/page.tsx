'use client'

import { Eraser, Hash, LogOut, Palette, Tags } from 'lucide-react'
import { signOut } from 'next-auth/react'

import DeleteAccountItem from '~/components/settings/deleteAccountItem'
import {
	SettingsItem,
	SettingsItemButton,
	SettingsItemLink,
} from '~/components/settings/settingsItem'
import SettingsSection from '~/components/settings/settingsSection'
import GoBackButton from '~/components/ui/goBackButton'
import InfoDialog from '~/components/ui/infoDialog'
import ThemeSelect from '~/components/ui/themeSelect'
import useRenderAfterMount from '~/hooks/useRenderAfterMount'

const Settings = () => {
	const SafeThemeSelect = useRenderAfterMount(<ThemeSelect />)
	return (
		<div className="flex h-full flex-col px-6">
			<div className="grid h-1/6 w-full grid-cols-3 place-items-center items-center">
				<GoBackButton to={'/habits'} />
				<h1 className="text-smuted-foreground text-xl">Settings</h1>
			</div>
			<div className="flex-1">
				<SettingsSection
					title="Sync"
					dialog={
						<InfoDialog
							header="Sync from Projects or Labels"
							text="Effortlessly import tasks from Todoist projects or labels. Select a project or label, and we'll fetch your tasks. Handpick the ones you want as habits, and we'll save them to your dashboard for easy tracking with insightful graphs."
						/>
					}
				>
					<SettingsItemLink
						title="From Projects"
						href="/settings/sync-new-habits/projects"
						Icon={Hash}
					/>
					<SettingsItemLink
						title="From Labels"
						href="/settings/sync-new-habits/labels"
						Icon={Tags}
					/>
				</SettingsSection>
				<SettingsSection title="App">
					<SettingsItemLink
						title="Delete timestamps or habits"
						href="/settings/edit-habits"
						Icon={Eraser}
					/>
					<SettingsItem title="Prefered theme" Icon={Palette}>
						{SafeThemeSelect}
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
		</div>
	)
}

export default Settings
