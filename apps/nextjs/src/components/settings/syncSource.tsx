import { useEffect, useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'

import type {SyncSources} from '~/app/settings/sync-new-habits/labels/page';
import { Button } from '../ui/button'
import type {SyncListWorkflowPhase, SyncSourceType} from './syncList';
import SyncSourceSelect from './syncSourceSelect'

interface Props {
	selectValues: SyncSources
	type: SyncSourceType
	phase: SyncListWorkflowPhase
	selectedSource: string
	setSelectedSource: Dispatch<SetStateAction<string>>
	handleNextPhase: () => void
}

const SyncSource = ({
	selectValues,
	type,
	setSelectedSource,
	phase,
	selectedSource,
	handleNextPhase,
}: Props) => {
	const [lastSource, setLastSource] = useState<string | null>(null)

	const handleButtonClick = () => {
		setLastSource(selectedSource)
		handleNextPhase()
	}

	useEffect(() => {
		if (phase === 'synced') {
			setLastSource(null)
		}
	}, [phase])

	if (phase === 'synced') {
		return
	}

	return (
		<div className="mb-8 flex items-center justify-between">
			<SyncSourceSelect
				selectValues={selectValues}
				onValueChange={setSelectedSource}
				sourceType={type}
			/>
			<Button
				className=""
				variant={phase === 'select-source' ? 'default' : 'secondary'}
				onClick={handleButtonClick}
				disabled={!selectedSource || lastSource === selectedSource}
			>
				Fetch habits
			</Button>
		</div>
	)
}

export default SyncSource
