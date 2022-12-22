import { NextPage } from 'next'
import DashboardHabit from '../../components/dashboardHabit'
import { trpc } from '../../lib/trpc'

const Habits: NextPage = () => {
  const allHabits = trpc.habit.getAll.useQuery()

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
