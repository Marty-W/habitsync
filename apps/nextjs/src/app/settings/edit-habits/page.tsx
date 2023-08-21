'use client'

import EditHabits from '~/components/settings/editHabits'
import SubSettingsPage from '~/components/settings/subSettingsPage'

export type EditHabitWorkflowPhase =
	| 'fetching-habits'
	| 'pick-habits'
	| 'mutating-habits'
	| 'synced'

export type EditHabitType = 'delete-timestamps' | 'delete-habits' | null

const EditHabitsPage = () => {
	return (
		<SubSettingsPage title="Edit habits">
			<EditHabits />
		</SubSettingsPage>
	)
}

export default EditHabitsPage
