import { useRouter } from 'next/router'
import Calendar from '../../components/calendar/calendar'

export const habitData = {
  description: 'Kazdy den ber prasky, musis byt zdravy. Je to jednoduche.',
  id: '5855839430',
  labels: ['habit'],
  name: '💊 Prášky',
  projectId: null,
  url: 'https://todoist.com/showTask?id=5855839430',
  timestamps: [
    {
      id: 'cl9gysb120001j0p94wsa2zkg',
      time: '2022-10-20T11:12:53.463Z',
      habitId: '5855839430',
    },
    {
      id: 'cl9gz7zop0001l708en8l92sk',
      time: '2022-10-20T11:25:05.258Z',
      habitId: '5855839430',
    },
    {
      id: 'cl9ia1r6f0001mh09qd0cjuya',
      time: '2022-10-21T09:15:56.247Z',
      habitId: '5855839430',
    },
  ],
}

const HabitDetail = () => {
  const router = useRouter()
  //THIS thing is url param, so habit/THETHING so I will have to fetch habit detail again (probably)
  const { id } = router.query
  // const { data: habitData } = trpc.habit.getHabitDetail.useQuery({
  //   id: id as string,
  // })

  //TODO add a loading state
  //TODO add handler to go back to dashboard

  const timestamps = new Set([
    ...habitData.timestamps.map((t) => {
      const day = new Date(t.time).getDay()

      return day
    }),
  ])

  return (
    <div className='flex h-screen flex-col p-5'>
      <div className='header mb-4 flex h-40 flex-col justify-center'>
        <h1 className='flex-1 text-center text-2xl'>{habitData?.name}</h1>
        <div className='flex flex-1 items-center rounded-lg bg-zinc-800 text-center'>
          <p className='flex-1  bg-zinc-800'>{habitData?.description}</p>
        </div>
      </div>
      <div className='flex flex-1 items-center justify-center'>
        <Calendar timestamps={timestamps} />
      </div>
      <div className='flex-1'></div>
    </div>
  )
}

export default HabitDetail
