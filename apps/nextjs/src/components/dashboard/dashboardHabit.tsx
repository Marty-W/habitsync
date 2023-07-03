import Link from "next/link"

import { type RouterOutputs } from "~/utils/trpc"
import CompletionsRow from "./completionsRow"
import DayCompletionStatus from "./dayCompletionStatus"

interface Props {
  habit: RouterOutputs["habit"]["getAll"][0]
}

const DashboardHabit = ({ habit }: Props) => {
  const { id, labels, name } = habit
  return (
    <Link href={`/habits/${id}?name=${name}`}>
      <div className="bg-card my-1 flex rounded-lg border-2 p-4">
        <span className="text-card-foreground">{name}</span>
        <CompletionsRow habitId={id} />
      </div>
    </Link>
  )
}

export default DashboardHabit
