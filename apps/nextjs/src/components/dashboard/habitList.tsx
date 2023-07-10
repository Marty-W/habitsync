import { api } from "~/utils/trpc"
import FetchError from "../ui/fetchError"
import HabitLoadingSkeleton from "../ui/habitLoadingSkeleton"
import DashboardHabit from "./dashboardHabit"

const HabitList = () => {
  const allHabits = api.habit.getAll.useQuery()

  if (allHabits.isLoading) return <HabitLoadingSkeleton count={3} />

  if (allHabits.isError)
    return (
      <FetchError
        isRefetching={allHabits.isRefetching}
        refetch={allHabits.refetch}
      />
    )

  return (
    <div className="flex flex-col">
      {allHabits.data.map((habit) => {
        return <DashboardHabit key={habit.id} habit={habit} />
      })}
    </div>
  )
}

export default HabitList
