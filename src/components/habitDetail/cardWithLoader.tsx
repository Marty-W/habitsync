import CardSkeleton from 'components/ui/cardSkeleton'
import Card from 'components/ui/card'
import Calendar from 'components/habitDetail/calendar/calendar'
import HabitDescription from 'components/habitDetail/habitDescription'
import Streaks from 'components/habitDetail/streaks'
import TotalCompletions from 'components/habitDetail/completions'
import { CalendarData, HabitDescriptionData, StreakData } from 'types'
import SuccessRate from './successRate'

//FIX cleanup the messy types

interface BaseProps {
  className?: string
  lineCount: number
  isLoadingSuccess: boolean
  mock?: boolean
}

interface CalendarProps extends BaseProps {
  cardType: 'calendar'
  data: CalendarData
}

interface HabitDescriptionProps extends BaseProps {
  cardType: 'habitDescription'
  data: HabitDescriptionData
}

interface StreakProps extends BaseProps {
  cardType: 'streak'
  data: StreakData
}

interface CompletionProps extends BaseProps {
  cardType: 'completion'
  data: number | undefined
}

interface SuccessRateProps extends BaseProps {
  cardType: 'successRate'
  data: string | undefined
}

type Props =
  | CalendarProps
  | HabitDescriptionProps
  | StreakProps
  | CompletionProps
  | SuccessRateProps

const CardWithLoader = ({
  className,
  lineCount,
  isLoadingSuccess,
  data,
  cardType,
  mock,
}: Props) => {
  if (!isLoadingSuccess || !data || mock) {
    return <CardSkeleton cardClassName={className} count={lineCount} />
  }

  let content

  switch (cardType) {
    case 'calendar':
      content = <Calendar timestamps={data} />
      break
    case 'habitDescription':
      content = <HabitDescription desc={data} />
      break
    case 'streak':
      content = <Streaks streaks={data} />
      break
    case 'completion':
      content = <TotalCompletions completions={data} />
      break
    case 'successRate':
      content = <SuccessRate rate={data} />
  }

  return <Card className={className}>{content}</Card>
}

export default CardWithLoader
