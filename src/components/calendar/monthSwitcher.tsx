import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import { MONTHS } from '../../lib/const'

interface Props {
  month: number
  year: number
  increment: () => void
  decrement: () => void
}

const MonthSwitcher = ({ month, year, decrement, increment }: Props) => {
  return (
    <div className='flex justify-center pt-5'>
      <div className='flex items-center'>
        <BsChevronDoubleLeft
          onClick={decrement}
          className='cursor-pointer text-xl'
        />
        <span className='px-4'>{MONTHS[month - 1]}</span>
        <BsChevronDoubleRight
          className='cursor-pointer text-xl'
          onClick={increment}
        />
      </div>
    </div>
  )
}

export default MonthSwitcher
