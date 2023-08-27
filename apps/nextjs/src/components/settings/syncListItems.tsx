import type { Dispatch, SetStateAction } from 'react'

import { api } from '~/utils/trpc'
import usePicker from '~/hooks/usePicker'
import { Button } from '../ui/button'
import HabitListItem from '../ui/habitListItem'
import SyncEmpty from './syncEmpty'
import type { SyncListWorkflowPhase, SyncSourceType } from './syncList'
import WorkflowError from './workflowError'
import WorkflowProgressStatus from './workflowProgressStatus'

interface Props {
	selectedSource: string
	type: SyncSourceType
	handleNextPhase: (phase: SyncListWorkflowPhase) => void
	phase: SyncListWorkflowPhase
	setNumOfHabitsCreated: Dispatch<SetStateAction<number>>
}

const SyncListItems = ({
	selectedSource,
	type,
	phase,
	handleNextPhase,
	setNumOfHabitsCreated,
}: Props) => {
	const { items, editItems } = usePicker()
	const todoistTasks = api.todoist.getNewTasksFromTodoist.useQuery(
		{
			type,
			id: selectedSource,
		},
		{
			enabled: phase === 'fetching-tasks',
			retry: false,
			onSuccess: () => handleNextPhase('pick-tasks'),
		},
	)
	const todoistSync = api.todoist.syncWithTodoist.useMutation({
		onMutate: () => handleNextPhase('syncing-tasks'),
		onSuccess: ({ numberOfHabitsCreated }) => {
			setNumOfHabitsCreated(numberOfHabitsCreated)
			handleNextPhase('synced')
		},
	})

	if (todoistTasks.isError) {
		return (
			<WorkflowError errorMessage={todoistTasks.error.message} kind="error" />
		)
	}

	if (phase === 'fetching-tasks') {
		return <WorkflowProgressStatus phase={phase} />
	}

	const noTasksToSync = todoistTasks.isSuccess && !todoistTasks.data?.length

	if (noTasksToSync) {
		return <SyncEmpty sourceType={type} />
	}

	return (
		<>
			<div className="divide-smuted-foreground/20 bg-scard flex-1 divide-y overflow-y-auto rounded-lg px-6 py-2">
				{todoistTasks.data?.map((task) => {
					return (
						<HabitListItem
							kind="add"
							name={task.name}
							key={task.id}
							isSelected={items.includes(task.id)}
							id={task.id}
							handleSelect={editItems}
						/>
					)
				})}
			</div>
			<div>
				{todoistTasks.isSuccess && (
					<div className="mx-auto mt-6 flex justify-center">
						<Button
							disabled={!items.length}
							onClick={() =>
								todoistSync.mutate({
									type,
									taskIds: items,
									sourceId: selectedSource,
								})
							}
						>
							Sync with Todoist
						</Button>
					</div>
				)}
			</div>
		</>
	)
}

export default SyncListItems
