import { motion } from 'framer-motion'
import NextError from 'next/error'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsArrowLeft } from 'react-icons/bs'
import Calendar from '../../components/calendar/calendar'
import CardSkeleton from '../../components/cardSkeleton'
import HabitDescription from '../../components/habitDescription'
// import Streaks from '../../components/streaks'
import { trpc } from '../../lib/trpc'

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
        <div className='flex min-h-screen flex-col bg-slate-200 p-5'>
            <div className='grid grid-cols-3 items-center text-center'>
                <motion.button whileTap={{ scale: 0.95 }}>
                    <Link href='/habits'>
                        <BsArrowLeft size='1.5rem' className='text-zinc-500' />
                    </Link>
                </motion.button>
                <div>
                    <h1 className='ml-auto justify-self-center text-xl text-zinc-800'>
                        {name}
                    </h1>
                </div>
            </div>
            {description.isSuccess ? (
                <HabitDescription desc={description.data} />
            ) : (
                <CardSkeleton count={5} />
            )}
            {timestamps.isSuccess ? (
                <Calendar timestamps={timestamps.data} />
            ) : (
                <CardSkeleton count={6} />
            )}
            {/* {bestStreaks && (
        <div>
          <Streaks streaks={bestStreaks} />
        </div>
      )}{' '} */}
        </div>
    )
}

export default HabitDetail
