//TODO figure out how to inherit stuff from trpc to not create new types

import Link from 'next/link'

interface IDashboardHabitProps {
  id: string
  name: string
  labels: string[]
  projectId: number | null
}

const DashboardHabit = ({
  id,
  labels,
  name,
  projectId,
}: IDashboardHabitProps) => {
  return (
    <Link href={`/habits/${id}`}>
      <div className='border-2'>
        <span>{name}</span>
        {/* displaying only labels that are not called 'habit'  */}
        <div>
          {labels.map((label) => {
            return (
              <span key={label} className='badge badge-primary'>
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
