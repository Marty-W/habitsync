'use client'

import SubSettingsPage from '~/components/settings/subSettingsPage'
import SyncFromProjects from '~/components/settings/syncFromProjects'

const SyncFromProjectsPage = () => {
	return (
		<SubSettingsPage title="Sync projects">
			<SyncFromProjects />
		</SubSettingsPage>
	)
}

export default SyncFromProjectsPage
