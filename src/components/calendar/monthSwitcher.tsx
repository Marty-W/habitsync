import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs'
import { MONTHS } from '../../const/date'

interface Props {
  month: number
  year: number
}

const MonthSwitcher = ({ month, year }: Props) => {
  return (
    <div className='flex justify-center pt-5'>
      <div className='flex items-center'>
        <BsChevronDoubleLeft className='cursor-pointer text-xl' />
        <span className='px-4'>{MONTHS[month]}</span>
        <BsChevronDoubleRight className='text-xl cursor-pointer' />
      </div>
    </div>
  )
}

export default MonthSwitcher
