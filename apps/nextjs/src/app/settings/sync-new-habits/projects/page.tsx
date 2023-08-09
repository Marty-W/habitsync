'use client'

import { api } from '~/utils/trpc'
import SubSettingsPage from '~/components/settings/subSettingsPage'
import SyncList from '~/components/settings/syncList'
import Loader from '~/components/ui/activeLoader'

const SyncFromProjects = () => {
	const userProjects = api.acc.getUserProjects.useQuery()
	return (
		<SubSettingsPage title="Sync from projects">
			{userProjects.isLoading && <Loader size={55} className="mx-auto mt-4" />}
			{userProjects.isSuccess && (
				<SyncList syncSources={userProjects.data} type="project" />
			)}
		</SubSettingsPage>
	)
}

export default SyncFromProjects
