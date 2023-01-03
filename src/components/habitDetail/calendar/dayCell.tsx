import clsx from 'clsx'

interface Props {
  isToday: boolean
  isThisMonth: boolean
  hasTimestamp: boolean
  date: number
}

//FIX dnesek neni dvojbarevny (cerna-cerna, x -x)

const DayCell = ({ date, hasTimestamp, isToday, isThisMonth }: Props) => {
  return (
    <div
      className={clsx(
        'm-1 flex h-9 w-9 items-center justify-center rounded-full p-3 text-lg text-zinc-600',
        {
          'border-2 border-red-500': isToday,
          'text-zinc-200': !isThisMonth,
          'text-red-200': hasTimestamp,
          'text-red-500': hasTimestamp && isThisMonth,
        }
      )}
    >
      <span>{date}</span>
    </div>
  )
}

export default DayCell
