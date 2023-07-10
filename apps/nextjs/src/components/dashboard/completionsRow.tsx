import { normalizeDate } from "@habitsync/lib"
import { isBefore } from "date-fns"

import useCompletionPillsData from "~/hooks/useCompletionPillsData"
import usePills from "~/hooks/usePills"
import FetchError from "../ui/fetchError"
import { Skeleton } from "../ui/loadingSkeleton"
import DayCompletionStatus from "./dayCompletionStatus"

interface Props {
  habitId: string
}

const CompletionsRow = ({ habitId }: Props) => {
  const { ref, pills } = usePills()
  const { timestamps, habitDetail } = useCompletionPillsData({ habitId })

  const refetchQueries = async () => {
    await Promise.all([timestamps.refetch(), habitDetail.refetch()])
  }

  if (timestamps.isLoading || habitDetail.isLoading || !pills) {
    return (
      <div className="flex">
        {Array.from(Array(7).keys()).map((i) => (
          <Skeleton
            key={i}
            className="bg-card-foreground/10 mx-1 h-8 w-[10px] rounded-lg"
          />
        ))}
      </div>
    )
  }

  if (timestamps.error || habitDetail.error) {
    return (
      <FetchError
        refetch={refetchQueries}
        isRefetching={timestamps.isRefetching || habitDetail.isRefetching}
      >
        <span>Try again</span>
      </FetchError>
    )
  }

  return (
    <div className="flex flex-1 justify-end" ref={ref}>
      {pills.map((day, index) => {
        return (
          <DayCompletionStatus
            key={index}
            date={day}
            isSuccessful={timestamps.data.timestamps.has(normalizeDate(day))}
            isExtraStreakDay={
              timestamps.data.extraStreakDays
                ? timestamps.data.extraStreakDays.has(normalizeDate(day))
                : false
            }
            isBeforeHabitStarted={isBefore(
              day,
              new Date(habitDetail.data.createdAt),
            )}
          />
        )
      })}
    </div>
  )
}

export default CompletionsRow
