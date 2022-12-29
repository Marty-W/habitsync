import { Streak } from '@lib/date'

interface Props {
  streaks: Streak[]
}

const Streaks = ({ streaks }: Props) => {
  return (
    <div>
      <h1>Streaks</h1>
    </div>
  )
}

export default Streaks
