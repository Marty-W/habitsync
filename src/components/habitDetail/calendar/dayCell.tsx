import clsx from 'clsx'

interface Props {
  isToday: boolean
  isThisMonth: boolean
  hasTimestamp: boolean
  date: number
}

const DayCell = ({ date, hasTimestamp, isToday, isThisMonth }: Props) => {
  return (
    <div
      className={clsx(
        'flex h-10 w-10 items-center justify-center rounded-2xl p-2 text-lg text-zinc-600',
        {
          'border-2 border-blue-700': isToday,
          'text-zinc-200': !isThisMonth,
          'bg-slate-50': isThisMonth,
          'text-red-200': hasTimestamp,
          'text-slate-0 bg-red-500': hasTimestamp && isThisMonth,
        }
      )}
    >
      <span>{date}</span>
    </div>
  )
}

export default DayCell
