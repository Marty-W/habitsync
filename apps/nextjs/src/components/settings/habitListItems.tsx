import { type RouterOutputs } from "@habitsync/api"

import { api } from "~/utils/trpc"
import usePicker from "~/hooks/usePicker"
import { type EditHabitWorkflowPhase } from "~/pages/settings/edit-habits"
import { Button } from "../ui/button"
import HabitListItem from "../ui/habitListItem"

interface Props {
  habits: RouterOutputs["habit"]["getAll"]
  setPhase: (phase: EditHabitWorkflowPhase) => void
  setMutationType: (type: "delete-timestamps" | "delete-habits") => void
  setNumberOfEdits: (num: number) => void
}

const HabitListItems = ({
  habits,
  setPhase,
  setMutationType,
  setNumberOfEdits,
}: Props) => {
  const { items, editItems } = usePicker()
  const deleteHabits = api.habit.deleteMany.useMutation({
    onMutate: () => {
      setPhase("mutating-habits")
      setMutationType("delete-habits")
    },
    onSuccess: ({ numberOfHabitsDeleted }) => {
      setNumberOfEdits(numberOfHabitsDeleted)
      setPhase("synced")
    },
  })
  const deleteTimestamps = api.timestamp.deleteMany.useMutation({
    onMutate: () => {
      setPhase("mutating-habits")
      setMutationType("delete-timestamps")
    },
    onSuccess: ({ deletedCount }) => {
      setPhase("synced")
      setNumberOfEdits(deletedCount)
    },
  })

  const habitIdsWithTimestamps = habits
    .filter((habit) => habit.numOfTimestamps > 0)
    .map((habit) => habit.id)

  return (
    <div className="bg-muted flex-1 rounded-t-lg px-6 py-2">
      {habits.map((habit) => (
        <HabitListItem
          kind="edit"
          name={habit.name}
          key={habit.id}
          isSelected={items.includes(habit.id)}
          id={habit.id}
          handleSelect={editItems}
          numOfTimestamps={habit.numOfTimestamps}
        />
      ))}
      <div className="mx-auto mt-10 flex flex-col justify-center gap-3 px-28">
        <Button
          disabled={
            !items.length ||
            items.every((id) => !habitIdsWithTimestamps.includes(id))
          }
          variant="secondary"
          onClick={() => deleteTimestamps.mutate({ habitIds: items })}
        >
          Delete timestamps
        </Button>
        <Button
          disabled={!items.length}
          variant="destructive"
          onClick={() => deleteHabits.mutate({ ids: items })}
        >
          Delete habits
        </Button>
      </div>
    </div>
  )
}

export default HabitListItems
