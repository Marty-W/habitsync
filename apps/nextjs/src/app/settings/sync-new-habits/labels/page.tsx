'use client'

import type { RouterOutputs } from '~/utils/trpc'
import SubSettingsPage from '~/components/settings/subSettingsPage'
import SyncFromLabels from '~/components/settings/syncFromLabels'

export type SyncSources =
	| RouterOutputs['todoist']['getUserProjects']
	| RouterOutputs['todoist']['getUserLabels']

const SyncFromLabelsPage = () => {
	return (
		<SubSettingsPage title="Sync labels">
			<SyncFromLabels />
		</SubSettingsPage>
	)
}

export default SyncFromLabelsPage
