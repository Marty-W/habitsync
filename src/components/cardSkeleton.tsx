import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Card from './card'

interface Props {
  cardClassName?: string
  skeletonClassName?: string
  count?: number
}

const CardSkeleton = ({ cardClassName, count, skeletonClassName }: Props) => {
  return (
    <Card className={cardClassName}>
      <Skeleton count={count || 0} className={skeletonClassName} />
    </Card>
  )
}

export default CardSkeleton
