interface Props {
  isToday: boolean
  isThisMonth: boolean
  hasTimestamp: boolean
  date: number
}

const DayCell = ({ date, hasTimestamp, isToday, isThisMonth }: Props) => {
  return (
    <div
      className={`flex w-10 items-center justify-center rounded-md  p-1 ${
        isToday ? 'bg-blue-600' : 'bg-slate-50'
      }`}
    >
      <span>{date}</span>
    </div>
  )
}

export default DayCell
