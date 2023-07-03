import { normalizeDate } from "@habitsync/lib"
import { eachDayOfInterval, isBefore, subDays } from "date-fns"

import { api } from "~/utils/trpc"
import DayCompletionStatus from "./dayCompletionStatus"

//TODO make this configurable based on the screen width
const MAX_NUM_DAYS = 15

interface Props {
  habitId: string
}

const CompletionsRow = ({ habitId }: Props) => {
  const { data, isLoading } = api.timestamp.getAllWithStreakDays.useQuery({
    habitId,
  })
  const { data: detailData, isLoading: detailLoading } =
    api.habit.getDetail.useQuery({ id: habitId })

  const today = new Date()
  const daysToDisplay = eachDayOfInterval({
    start: subDays(today, MAX_NUM_DAYS),
    end: today,
  }).reverse()

  if (isLoading && detailLoading) {
    return <span>Loading...</span>
  }

  return (
    <div className="flex flex-1 justify-end">
      {data &&
        detailData &&
        daysToDisplay.map((day, index) => {
          return (
            <DayCompletionStatus
              key={index}
              date={day}
              isSuccessful={data.timestamps.has(normalizeDate(day))}
              isExtraStreakDay={
                data.extraStreakDays
                  ? data.extraStreakDays.has(normalizeDate(day))
                  : false
              }
              isBeforeHabitStarted={isBefore(
                day,
                new Date(detailData.createdAt),
              )}
            />
          )
        })}
    </div>
  )
}

export default CompletionsRow
