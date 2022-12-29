import NextError from 'next/error'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsArrowLeft } from 'react-icons/bs'
import Calendar from 'components/habitDetail/calendar/calendar'
import CardSkeleton from 'components/ui/cardSkeleton'
import HabitDescription from 'components/habitDetail/habitDescription'
// import Streaks from '../../components/streaks'
import { HiOutlineCog } from 'react-icons/hi'
import { SiTodoist } from 'react-icons/si'
import { trpc } from 'lib/trpc'

const HabitDetail = () => {
  const id = useRouter().query.id as string
  const name = useRouter().query.name as string
  const timestamps = trpc.timestamp.getAll.useQuery({
    habitId: id,
  })
  const description = trpc.habit.getDetail.useQuery({
    id: id,
  })

  if (description.isError || timestamps.isError) {
    const statusCode =
      (description.error?.data?.httpStatus ?? 500) ||
      (timestamps.error?.data?.httpStatus ?? 500)

    const title = description.error?.message || timestamps.error?.message

    return <NextError statusCode={statusCode} title={title} />
  }

  return (
    <div className='flex min-h-screen flex-col bg-slate-200 px-5 py-8'>
      <div className='mb-8 grid grid-cols-3 items-center text-center'>
        <motion.button whileTap={{ scale: 0.95 }}>
          <Link href='/habits'>
            <BsArrowLeft size='1.8rem' className='text-zinc-500' />
          </Link>
        </motion.button>
        <div>
          <h1 className='ml-auto justify-self-center text-2xl text-zinc-800'>
            {name}
          </h1>
        </div>
        <div className='flex items-center justify-end'>
          <Link href='/account'>
            <HiOutlineCog size='1.8rem' className='text-zinc-500' />
          </Link>
        </div>
      </div>
      {description.isSuccess ? (
        <HabitDescription desc={description.data} />
      ) : (
        <CardSkeleton count={5} />
      )}
      <Link
        href={`${description.data?.url}`}
        target='_blank'
        className='mt-4 flex items-center justify-center hover:text-zinc-400'
      >
        <SiTodoist size='1rem' className='mr-1' />
        <span>Open in Todoist</span>
      </Link>
      {timestamps.isSuccess ? (
        <Calendar timestamps={timestamps.data} />
      ) : (
        <CardSkeleton count={6} />
      )}
    </div>
  )
}

export default HabitDetail
