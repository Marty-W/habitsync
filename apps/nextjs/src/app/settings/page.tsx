'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'

import DeleteAccountItem from '~/components/settings/deleteAccountItem'
import SettingsItem from '~/components/settings/settingsItem'
import SettingsSection from '~/components/settings/settingsSection'
import GoBackButton from '~/components/ui/goBackButton'
import InfoDialog from '~/components/ui/infoDialog'
import ThemeSelect from '~/components/ui/themeSelect'

const Settings = () => {
	return (
		<div className="cotainer flex h-screen min-h-screen flex-col px-4">
			<div className="my-5 grid h-1/5 grid-rows-2">
				<GoBackButton className="self-start" />
				<h1 className="text-accent self-end text-4xl">Settings</h1>
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
				/>
				<SettingsItem
					title="From Labels"
					as={Link}
					href="/settings/sync-new-habits/labels"
				/>
			</SettingsSection>
			<SettingsSection title="App">
				<SettingsItem
					title="Delete timestamps or habits"
					as={Link}
					href="/settings/edit-habits"
				/>
				<SettingsItem title="Prefered theme" as="button">
					<ThemeSelect />
				</SettingsItem>
			</SettingsSection>
			<SettingsSection title="Account">
				<SettingsItem
					title="Log out"
					as="button"
					onClick={() => signOut({ callbackUrl: '/' })}
				/>
				<DeleteAccountItem />
			</SettingsSection>
		</div>
	)
}

export default Settings
