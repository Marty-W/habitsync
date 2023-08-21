'use client'

import { useState } from 'react'

import { api } from '~/utils/trpc'
import EditSuccess from '~/components/settings/editSuccess'
import HabitListItems from '~/components/settings/habitListItems'
import SubSettingsPage from '~/components/settings/subSettingsPage'
import WorkflowError from '~/components/settings/workflowError'
import WorkflowProgressStatus from '~/components/settings/workflowProgressStatus'
import type {
	EditHabitType,
	EditHabitWorkflowPhase,
} from '~/app/settings/edit-habits/page'

const EditHabits = () => {
	const utils = api.useContext()
	const [phase, setPhase] = useState<EditHabitWorkflowPhase>('fetching-habits')
	const [editType, setEditType] = useState<EditHabitType>(null)
	const [numOfEdits, setNumberOfEdits] = useState<number>(0)
	const userHabits = api.habit.getAll.useQuery(undefined, {
		onSuccess: () => setPhase('pick-habits'),
		retry: 0,
	})

	const handlePhaseChange = (newPhase: EditHabitWorkflowPhase) => {
		setPhase(newPhase)
	}

	const handleEditMore = async () => {
		await utils.habit.getAll.invalidate()
		setPhase('pick-habits')
	}

	if (userHabits.isError) {
		return (
			<SubSettingsPage title="Edit habits">
				<WorkflowError errorMessage={userHabits.error.message} kind="error" />
			</SubSettingsPage>
		)
	}
	return (
		<>
			{(phase === 'fetching-habits' || phase === 'mutating-habits') && (
				<WorkflowProgressStatus phase={phase} />
			)}
			{phase === 'pick-habits' && userHabits.isSuccess && (
				<HabitListItems
					setPhase={handlePhaseChange}
					habits={userHabits.data}
					setMutationType={setEditType}
					setNumberOfEdits={setNumberOfEdits}
				/>
			)}
			{phase === 'synced' && (
				<EditSuccess
					handleEditMore={handleEditMore}
					type={editType}
					numOfMutations={numOfEdits}
				/>
			)}
		</>
	)
}

export default EditHabits
