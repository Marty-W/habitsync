import Link from "next/link"

import { type RouterOutputs } from "~/utils/trpc"
import CompletionsRow from "./completionsRow"

interface Props {
  habit: RouterOutputs["habit"]["getAll"][0]
}

const DashboardHabit = ({ habit }: Props) => {
  const { id, name } = habit
  return (
    <Link href={`/habits/${id}?name=${name}`}>
      <div className="bg-card hover:bg-accent/30 text-card-foreground my-2 flex items-center  rounded-xl p-5">
        <span className="w-1/3">{name}</span>
        <CompletionsRow habitId={id} />
      </div>
    </Link>
  )
}

export default DashboardHabit
