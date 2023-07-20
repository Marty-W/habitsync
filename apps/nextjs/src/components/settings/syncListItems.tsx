import { useState, type Dispatch, type SetStateAction } from "react"
import { CircleSlash, Link } from "lucide-react"

import { api } from "~/utils/trpc"
import { Button } from "../ui/button"
import SyncEmpty from "./syncEmpty"
import { type SyncListWorkflowPhase, type SyncSourceType } from "./syncList"
import SyncListItem from "./syncListItem"
import SyncProgressStatus from "./syncProgressStatus"

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
  const [selectedTasks, setSelectedTasks] = useState<string[]>([])

  const handleAddTasks = (id: string) => {
    setSelectedTasks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }
  const todoistTasks = api.habit.getNewTasksFromTodoist.useQuery(
    {
      type,
      id: selectedSource,
    },
    {
      enabled: phase === "fetching-tasks",
      retry: false,
      onSuccess: () => handleNextPhase("pick-tasks"),
    },
  )
  const todoistSync = api.habit.syncWithTodoist.useMutation({
    onMutate: () => handleNextPhase("syncing-tasks"),
    onSuccess: ({ numberOfHabitsCreated }) => {
      setNumOfHabitsCreated(numberOfHabitsCreated)
      handleNextPhase("synced")
    },
  })

  if (phase === "fetching-tasks") {
    return <SyncProgressStatus phase={phase} />
  }

  const noTasksToSync = todoistTasks.isSuccess && !todoistTasks.data?.length

  if (noTasksToSync) {
    return <SyncEmpty sourceType={type} />
  }

  return (
    <div className="bg-muted flex-1 rounded-t-lg px-6 py-2">
      {todoistTasks.isError && (
        <div className="mt-10 text-center">
          <span className="text-muted-foreground text-sm">
            {todoistTasks.error.message}
          </span>
        </div>
      )}
      {todoistTasks.data?.map((task) => {
        return (
          <SyncListItem
            name={task.name}
            key={task.id}
            isSelected={selectedTasks.includes(task.id)}
            id={task.id}
            handleAddTask={handleAddTasks}
          />
        )
      })}
      {todoistTasks.isSuccess && (
        <div className="mx-auto mt-10 flex justify-center">
          <Button
            disabled={!selectedTasks.length}
            onClick={() =>
              todoistSync.mutate({
                type,
                taskIds: selectedTasks,
                sourceId: selectedSource,
              })
            }
          >
            Sync with Todoist
          </Button>
        </div>
      )}
    </div>
  )
}

export default SyncListItems
