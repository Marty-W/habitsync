import Link from "next/link"

import { type RouterOutputs } from "~/utils/trpc"
import CompletionsRow from "./completionsRow"

interface Props {
  habit: RouterOutputs["habit"]["getAll"][0]
}

const DashboardHabit = ({ habit }: Props) => {
  const { id, name } = habit

  const hasNoData = habit.numOfTimestamps === 0
  return (
    <Link href={`/habits/${id}?name=${name}`}>
      <div className="bg-card hover:bg-accent/30 text-card-foreground my-2 flex items-center justify-between rounded-xl p-5">
        <span className="flex-1">{name}</span>
        <CompletionsRow habitId={id} />
      </div>
    </Link>
  )
}

export default DashboardHabit
