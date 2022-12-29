import Link from 'next/link'
import { RouterOutput } from '@lib/trpc'

interface IDashboardHabitProps {
  habit: RouterOutput['habit']['getAll'][0]
}

const DashboardHabit = ({ habit }: IDashboardHabitProps) => {
  const { id, labels, name } = habit
  return (
    <Link href={`/habits/${id}?name=${name}`}>
      <div className='border-2'>
        <span>{name}</span>
        {/* displaying only labels that are not called 'habit'  */}
        <div>
          {labels.map((label) => {
            if (label === 'habit') return null
            return (
              <span key={label} className='badge-primary badge'>
                {label}
              </span>
            )
          })}
        </div>
      </div>
    </Link>
  )
}

export default DashboardHabit
