'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Eraser, Hash, LogOut, Palette, Tags } from 'lucide-react'
import { signOut } from 'next-auth/react'

import DeleteAccountItem from '~/components/settings/deleteAccountItem'
import SettingsItem from '~/components/settings/settingsItem'
import SettingsSection from '~/components/settings/settingsSection'
import GoBackButton from '~/components/ui/goBackButton'
import InfoDialog from '~/components/ui/infoDialog'
import ThemeSelect from '~/components/ui/themeSelect'

const Settings = () => {
	// const searchParams = useSearchParams()
	return (
		<div className="flex flex-col px-6">
			<div className="my-5 grid h-1/5 grid-rows-2">
				<GoBackButton className="self-start" to={'/habits'} />
				<h1 className="text-smuted-foreground self-end text-4xl">Settings</h1>
			</div>
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
					as={Link}
					href="/settings/sync-new-habits/projects"
					Icon={Hash}
				/>
				<SettingsItem
					title="From Labels"
					as={Link}
					href="/settings/sync-new-habits/labels"
					Icon={Tags}
				/>
			</SettingsSection>
			<SettingsSection title="App">
				<SettingsItem
					title="Delete timestamps or habits"
					as={Link}
					href="/settings/edit-habits"
					Icon={Eraser}
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

export default Settings
