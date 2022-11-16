import { NextPage } from 'next'
import DashboardHabit from '../../components/dashboardHabit'
import { trpc } from '../../lib/trpc'

const Habits: NextPage = () => {
  const { data: habitData } = trpc.habit.getUserHabits.useQuery()

  console.log(habitData)

  return (
    <div className='flex min-h-screen flex-col'>
      <h1>Dashboard</h1>
      <div className='flex flex-1 flex-col'>
        {habitData?.map(({ id, labels, name, projectId }) => {
          return (
            <DashboardHabit
              key={id}
              id={id}
              name={name}
              labels={labels}
              projectId={projectId}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Habits
