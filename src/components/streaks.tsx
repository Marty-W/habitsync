import { calculateStreaks } from '../lib/date'

interface Props {
  timestamps: Set<string>
}

const Streaks = ({ timestamps }: Props) => {
  const sortedStreaks = calculateStreaks([...timestamps])

  console.log(sortedStreaks)

  return (
    <div>
      <h1>Streaks</h1>
    </div>
  )
}

export default Streaks
