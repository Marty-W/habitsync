'use client'

import SubSettingsPage from '~/components/settings/subSettingsPage'
import SyncFromProjects from '~/components/settings/syncFromProjects'

const SyncFromProjectsPage = () => {
	return (
		<SubSettingsPage title="Sync from projects">
			<SyncFromProjects />
		</SubSettingsPage>
	)
}

export default SyncFromProjectsPage
