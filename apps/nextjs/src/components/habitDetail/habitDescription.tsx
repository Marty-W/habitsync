import { type RouterOutputs } from "~/utils/trpc"
import Tag from "../ui/tag"
import RecurrenceTag from "./recurrenceTag"

type Props = {
  desc: RouterOutputs["habit"]["getDetail"]
}

const HabitDescription = ({ desc }: Props) => (
  <div className="flex flex-col items-center justify-center">
    <div className="p-2">
      <p className="text-card-foreground flex-1 text-lg">{desc.description}</p>
    </div>
    <div className="text-card-foreground/40 p-2">
      <RecurrenceTag
        type={desc.recurrenceType}
        step={desc.recurrenceStep}
        days={desc.recurrenceDays}
      />
    </div>
    <div className="flex justify-center">
      {desc.labels.map((label) => {
        return <Tag key={label} tag={label} />
      })}
    </div>
  </div>
)

export default HabitDescription
