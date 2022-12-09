import { motion } from 'framer-motion'
import { useState } from 'react'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'
import { MONTHS } from '../../lib/const'

interface Props {
  month: number
  year: number
  increment: () => void
  decrement: () => void
}

const variants = {
  enter: (direction: number) => {
    return {
      y: direction < 0 ? 30 : -30,
      opacity: 0,
    }
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      y: direction > 0 ? 30 : -30,
      opacity: 0,
    }
  },
}

const MonthSwitcher = ({ month, year, decrement, increment }: Props) => {
  const [direction, setDirection] = useState(0)

  const handleChevronClick = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setDirection(-1)
      decrement()
    } else {
      setDirection(1)
      increment()
    }
  }

  return (
    <div className='mb-5 flex items-center justify-between px-6 text-lg'>
      <motion.button whileTap={{ scale: 0.85 }}>
        <GoChevronLeft
          onClick={() => handleChevronClick('left')}
          className='rounded-full'
          size='1.5rem'
        />
      </motion.button>
      <motion.span
        className='px-4 text-lg  text-zinc-800 '
        variants={variants}
        initial='enter'
        animate='center'
        exit='exit'
        key={month}
        custom={direction}
      >
        {MONTHS[month]} {year}
      </motion.span>

      <motion.button whileTap={{ scale: 0.85 }} custom={1}>
        <GoChevronRight
          className='rounded-full'
          onClick={() => handleChevronClick('right')}
          size='1.5rem'
        />
      </motion.button>
    </div>
  )
}

export default MonthSwitcher
