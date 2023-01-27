import { RouterOutput } from '@/lib/trpc'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

interface Props {
    streaks: RouterOutput['streak']['getBest']
}

const Streaks = ({ streaks }: Props) => {
    return (
        <div className='text-center'>
            <h1 className='text-lg text-zinc-800'>Your best streaks</h1>
            <div className=''>
                {streaks.map((streak, index, arr) => {
                    //TODO add handling of dates that are not this year
                    const timeFormat = 'MMM d'
                    const formattedStart = format(new Date(streak.start), timeFormat)
                    const formattedEnd = format(new Date(streak.end), timeFormat)

                    // I presume that the first streak is the longest one
                    const maxStreak = arr[0].length

                    const barWidth = (streak.length / maxStreak) * 100
                    return (
                        <div
                            key={`${index}-${barWidth}`}
                            className='my-4 grid grid-flow-row grid-cols-[70px_1fr_70px] items-center'
                        >
                            <span>{formattedStart}</span>
                            <div
                                className={`relative flex h-6 w-full items-center justify-center justify-self-center rounded-xl bg-slate-200 shadow-inner`}
                            >
                                {/* FIX PLAY WITH THE DURATION */}
                                <motion.div
                                    style={{ minWidth: '30px' }}
                                    className='rounded-xl bg-red-500'
                                    initial={{ width: 0 }}
                                    animate={{ width: `${barWidth}%` }}
                                    transition={{ duration: 3 }}
                                >
                                    <span className='text-slate-100'>{streak.length}</span>
                                </motion.div>
                                {index === 0 && (
                                    <span className='absolute right-2 text-xs text-slate-100'>
                                        days
                                    </span>
                                )}
                            </div>
                            <span>{formattedEnd}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Streaks
