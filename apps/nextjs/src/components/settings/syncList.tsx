import { useState } from 'react'

import { type SyncSources } from '~/pages/settings/sync-new-habits/labels'
import SyncListItems from './syncListItems'
import SyncSource from './syncSource'
import SyncSuccess from './syncSuccess'
import WorkflowProgressStatus from './workflowProgressStatus'

export type SyncListWorkflowPhase =
	| 'select-source'
	| 'fetching-tasks'
	| 'pick-tasks'
	| 'syncing-tasks'
	| 'synced'

export type SyncSourceType = 'project' | 'label'

interface Props {
	syncSources: SyncSources
	type: SyncSourceType
}

const SyncList = ({ syncSources, type }: Props) => {
	const [phase, setPhase] = useState<SyncListWorkflowPhase>('select-source')
	const [selectedSource, setSelectedSource] = useState('')
	const [numOfHabitsCreated, setNumOfHabitsCreated] = useState(0)

	const handlePhaseChange = (newPhase: SyncListWorkflowPhase) => {
		setPhase(newPhase)
	}

	const handlePickAgain = () => {
		setPhase('select-source')
		setSelectedSource('')
	}

	return (
		<div className="flex flex-1 flex-col">
			<SyncSource
				selectValues={syncSources}
				type={type}
				phase={phase}
				selectedSource={selectedSource}
				setSelectedSource={setSelectedSource}
				handleNextPhase={() => handlePhaseChange('fetching-tasks')}
			/>
			{(phase === 'fetching-tasks' || phase === 'pick-tasks') && (
				<SyncListItems
					phase={phase}
					handleNextPhase={handlePhaseChange}
					selectedSource={selectedSource}
					setNumOfHabitsCreated={setNumOfHabitsCreated}
					type={type}
				/>
			)}
			{phase === 'syncing-tasks' && <WorkflowProgressStatus phase={phase} />}
			{phase === 'synced' && (
				<SyncSuccess
					numOfHabitsCreated={numOfHabitsCreated}
					sourceType={type}
					handleSyncAgain={handlePickAgain}
				/>
			)}
		</div>
	)
}

export default SyncList
