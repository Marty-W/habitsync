'use client'

import { api, type RouterOutputs } from '~/utils/trpc'
import SubSettingsPage from '~/components/settings/subSettingsPage'
import SyncList from '~/components/settings/syncList'
import Loader from '~/components/ui/activeLoader'

export type SyncSources =
	| RouterOutputs['acc']['getUserProjects']
	| RouterOutputs['acc']['getUserLabels']

const SyncFromLabels = () => {
	const userLabels = api.acc.getUserLabels.useQuery()
	return (
		<SubSettingsPage title="Sync from labels">
			{userLabels.isLoading && <Loader size={55} className="mx-auto mt-4" />}
			{userLabels.isSuccess && (
				<SyncList syncSources={userLabels.data} type="label" />
			)}
		</SubSettingsPage>
	)
}

export default SyncFromLabels
