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
      <GoChevronLeft
        onClick={decrement}
        className='cursor-pointer rounded-full hover:bg-slate-200'
      />
      <span className='px-4 text-lg  text-zinc-800 '>
        {MONTHS[month]} {year}
      </span>
      <GoChevronRight
        className='cursor-pointer rounded-full text-lg hover:bg-slate-200'
        onClick={increment}
      />
    </div>
  )
}

export default MonthSwitcher
