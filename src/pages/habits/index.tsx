import { NextPage } from 'next'
import { useEffect } from 'react'
import DashboardHabit from 'components/dashboard/dashboardHabit'
import { trpc } from 'lib/trpc'

const Habits: NextPage = () => {
  const allHabits = trpc.habit.getAll.useQuery()
  const utils = trpc.useContext()

  //TODO add loading state
  //TODO add error state

  useEffect(() => {
    const allHabitIds = allHabits.data?.flatMap((habit) => habit.id) || []

    for (const id of allHabitIds) {
      void utils.habit.getDetail.prefetch({ id })
      void utils.timestamp.getAll.prefetch({ habitId: id })
      void utils.streak.getBest.prefetch({ habitId: id, numStreaks: 5 })
    }
  }, [allHabits.data, utils])

  return (
    <div className='flex min-h-screen flex-col'>
      <h1>Dashboard</h1>
      <div className='flex flex-1 flex-col'>
        {allHabits.data?.map((habit) => {
          return <DashboardHabit key={habit.id} habit={habit} />
        })}
      </div>
    </div>
  )
}

export default Habits
