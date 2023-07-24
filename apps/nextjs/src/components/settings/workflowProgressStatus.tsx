import { type EditHabitWorkflowPhase } from "~/pages/settings/edit-habits"
import Loader from "../ui/activeLoader"
import { type SyncListWorkflowPhase } from "./syncList"

interface Props {
  phase: SyncListWorkflowPhase | EditHabitWorkflowPhase
}

const STATUS_MESSAGES = {
  "fetching-tasks": "Fetching tasks from Todoist...",
  "syncing-tasks": "Syncing habits with our database...",
  "fetching-habits": "Fetching habits from our database...",
  "mutating-habits": "Updating habits in our database...",
}

const WorkflowProgressStatus = ({ phase }: Props) => {
  const validPhase = phase as keyof typeof STATUS_MESSAGES
  return (
    <div className="flex-1 flex-col items-center justify-center text-center">
      <Loader size={48} className="text-muted-foreground mx-auto my-4" />
      <span className="text-muted-foreground">
        {STATUS_MESSAGES[validPhase]}
      </span>
    </div>
  )
}

export default WorkflowProgressStatus
