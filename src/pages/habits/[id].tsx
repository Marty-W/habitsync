import NextError from 'next/error'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsArrowLeft } from 'react-icons/bs'
import { HiOutlineCog } from 'react-icons/hi'
import { SiTodoist } from 'react-icons/si'
import { trpc } from 'lib/trpc'
import CardWithLoader from 'components/habitDetail/cardWithLoader'

const HabitDetail = () => {
  const id = useRouter().query.id as string
  const name = useRouter().query.name as string
  const timestamps = trpc.timestamp.getAll.useQuery({
    habitId: id,
  })
  const description = trpc.habit.getDetail.useQuery({
    id: id,
  })

  const streaks = trpc.streak.getBest.useQuery({ habitId: id, numStreaks: 5 })
  const totalCompletions = trpc.stats.getTotalHabitCompletions.useQuery({
    habitId: id,
  })

  const successRate = trpc.stats.getHabitSuccessRate.useQuery({
    habitId: id,
  })

  if (description.isError || timestamps.isError) {
    const statusCode =
      (description.error?.data?.httpStatus ?? 500) ||
      (timestamps.error?.data?.httpStatus ?? 500)

    const title = description.error?.message || timestamps.error?.message

    return <NextError statusCode={statusCode} title={title} />
  }

  return (
    <div className='flex min-h-screen flex-col bg-slate-200 px-7 py-8'>
      <div className='mb-8 grid grid-cols-3 items-center text-center'>
        <motion.button whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
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
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href='/account'>
              <HiOutlineCog size='1.8rem' className='text-zinc-500' />
            </Link>
          </motion.button>
        </div>
      </div>
      <CardWithLoader
        cardType='habitDescription'
        data={description.data}
        isLoadingSuccess={description.isSuccess}
        lineCount={4}
        className='mb-8'
      />
      <div className='grid grid-cols-2 gap-x-5'>
        <CardWithLoader
          cardType='completion'
          data={totalCompletions.data}
          isLoadingSuccess={totalCompletions.isSuccess}
          lineCount={3}
          className='mb-8'
        />
        <CardWithLoader
          cardType='successRate'
          data={successRate.data}
          isLoadingSuccess={successRate.isSuccess}
          lineCount={3}
          className='mb-8'
        />
      </div>
      <CardWithLoader
        data={timestamps.data}
        lineCount={8}
        cardType='calendar'
        isLoadingSuccess={timestamps.isSuccess}
        className='mb-8'
      />
      <CardWithLoader
        data={streaks.data}
        lineCount={6}
        cardType='streak'
        isLoadingSuccess={streaks.isSuccess}
        className='mb-8'
      />
      <Link
        href={`${description.data?.url}`}
        target='_blank'
        className='mt-4 flex items-center justify-center hover:text-zinc-400'
      >
        <SiTodoist size='1rem' className='mr-1' />
        <span>Open in Todoist</span>
      </Link>
    </div>
  )
}

export default HabitDetail
