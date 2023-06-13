import { motion } from 'framer-motion'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { MONTHS } from '@habitsync/lib'

interface Props {
    month: number
    year: number
    handleMonthChange: (op: 'addMonth' | 'subMonth') => void
}

const MonthSwitcher = ({ month, year, handleMonthChange }: Props) => {
    return (
        <div className='mb-5 flex items-center justify-between px-6 text-lg'>
            <motion.button whileTap={{ scale: 0.85 }}>
                <GoChevronLeft
                    onClick={() => handleMonthChange('subMonth')}
                    className='rounded-full'
                    size='1em'
                />
            </motion.button>
            <span className='px-4 text-lg text-zinc-800'>
                <span>
                    {MONTHS[month]} {year}
                </span>
            </span>
            <motion.button whileTap={{ scale: 0.85 }}>
                <GoChevronRight
                    className='rounded-full'
                    onClick={() => handleMonthChange('addMonth')}
                    size='1em'
                />
            </motion.button>
        </div>
    )
}

export default MonthSwitcher
