import { useRouter } from 'next/router'
import Calendar from '../../components/calendar/calendar'
import Streaks from '../../components/streaks'
import { trpc } from '../../lib/trpc'

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
  const { id } = router.query
  const { data: timestamps } = trpc.timestamp.getAllTimestamps.useQuery(
    {
      habitId: id as string,
    },
    { enabled: !!id }
  )

  const { data: bestStreaks } = trpc.timestamp.getBestStreaks.useQuery(
    {
      habitId: id as string,
      numStreaks: 5,
    },
    {
      enabled: !!id,
    }
  )

  //TODO add a loading state
  //TODO add handler to go back to dashboard

  return (
    <div className='flex min-h-screen flex-col bg-slate-50 p-5'>
      <div className='mt-8 mb-4 flex flex-col'>
        <h1 className='flex-1 text-2xl text-zinc-800'>{habitData?.name}</h1>
        <p className='flex-1 py-6 text-zinc-500'>{habitData?.description}</p>
      </div>
      {timestamps && <Calendar timestamps={timestamps} />}
      {/* {bestStreaks && (
        <div>
          <Streaks streaks={bestStreaks} />
        </div>
      )}{' '} */}
    </div>
  )
}

export default HabitDetail
