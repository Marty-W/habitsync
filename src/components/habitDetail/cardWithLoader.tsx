import { RouterOutput } from '@/lib/trpc'
import CardSkeleton from 'components/ui/cardSkeleton'
import Card from 'components/ui/card'
import Calendar from 'components/habitDetail/calendar/calendar'
import HabitDescription from 'components/habitDetail/habitDescription'

type CalendarData = RouterOutput['timestamp']['getAll'] | null | undefined
type HabitDescriptionData =
  | RouterOutput['habit']['getDetail']
  | null
  | undefined

interface BaseProps {
  className?: string
  lineCount: number
  isLoadingSuccess: boolean
}

interface CalendarProps extends BaseProps {
  cardType: 'calendar'
  data: CalendarData
}

interface HabitDescriptionProps extends BaseProps {
  cardType: 'habitDescription'
  data: HabitDescriptionData
}

type Props = CalendarProps | HabitDescriptionProps

const CardWithLoader = ({
  className,
  lineCount,
  isLoadingSuccess,
  data,
  cardType,
}: Props) => {
  if (!isLoadingSuccess || !data) {
    return <CardSkeleton cardClassName={className} count={lineCount} />
  }

  let content

  switch (cardType) {
    case 'calendar':
      content = <Calendar timestamps={data} />
      break
    case 'habitDescription':
      content = <HabitDescription desc={data} />
  }

  return <Card className={className}>{content}</Card>
}

export default CardWithLoader
