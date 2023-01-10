import clsx from 'clsx'

interface Props {
  isToday: boolean
  isThisMonth: boolean
  hasTimestamp: boolean
  date: number
  isExtraStreakDay: boolean
}

const DayCell = ({
  date,
  hasTimestamp,
  isToday,
  isThisMonth,
  isExtraStreakDay,
}: Props) => {
  return (
    <div
      className={clsx(
        'relative m-1 flex h-9 w-9 items-center justify-center rounded-full p-3 text-lg text-zinc-600',
        {
          'ring ring-red-400 ring-offset-4': isToday,
          'text-zinc-200': !isThisMonth,
          'text-red-200': !isThisMonth && hasTimestamp,
          'bg-red-400 text-zinc-100': hasTimestamp && isThisMonth,
          'bg-red-200 text-zinc-100': isExtraStreakDay && isThisMonth,
        }
      )}
    >
      <span>{date}</span>
    </div>
  )
}

export default DayCell
