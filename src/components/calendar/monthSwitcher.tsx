import { motion } from 'framer-motion'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { MONTHS } from '../../lib/const'

interface Props {
  month: number
  year: number
  increment: () => void
  decrement: () => void
}

const MonthSwitcher = ({ month, year, decrement, increment }: Props) => {
  return (
    <div className='mb-5 flex items-center justify-between px-6 text-lg'>
      <motion.button whileTap={{ scale: 0.85 }}>
        <GoChevronLeft
          onClick={decrement}
          className='rounded-full'
          size='1.5rem'
        />
      </motion.button>
      <span className='px-4 text-lg  text-zinc-800 '>
        {MONTHS[month]} {year}
      </span>

      <motion.button whileTap={{ scale: 0.85 }}>
        <GoChevronRight
          className='rounded-full'
          onClick={increment}
          size='1.5rem'
        />
      </motion.button>
    </div>
  )
}

export default MonthSwitcher
