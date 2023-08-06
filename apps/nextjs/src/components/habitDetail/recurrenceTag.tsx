import { type RecurrenceType } from "@habitsync/lib"

interface Props {
  type: RecurrenceType
  step: number | null
  days: string[]
}
const RecurrenceTag = ({ type, step, days }: Props) => {
  if (type === "every_workday") {
    return <span>Every workday</span>
  }

  if (type === "every_x_days") {
    return <span>Every {step} days</span>
  }

  if (type === "specific_days") {
    return (
      <span>
        Every{" "}
        {days.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </span>
    )
  }
  return <span>Every day</span>
}

export default RecurrenceTag
