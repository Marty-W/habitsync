import Link from 'next/link'
import { RouterOutputs } from '~/utils/trpc'

interface IDashboardHabitProps {
    habit: RouterOutputs['habit']['getAll'][0]
}

const DashboardHabit = ({ habit }: IDashboardHabitProps) => {
    const { id, labels, name } = habit
    return (
        <Link href={`/habits/${id}?name=${name}`}>
            <div className='my-1 rounded-lg border-2 bg-slate-100 p-4 hover:ring hover:ring-red-400'>
                <span>{name}</span>
            </div>
        </Link>
    )
}

export default DashboardHabit
