import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'

const HabitDetail = () => {
  const router = useRouter()
  //THIS thing is url param, so habit/THETHING so I will have to fetch habit detail again (probably)
  const { id } = router.query
  const { data: habitData } = trpc.habit.getHabitDetail.useQuery({
    id: id as string,
  })

  //TODO add a loading state
  //TODO add handler to go back to dashboard

  return (
    <div>
      <h1>Habit Detail</h1>
      <span>stuff....</span>
    </div>
  )
}

export default HabitDetail
