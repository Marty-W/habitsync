import { Card, Title } from '@tremor/react'

import type { RouterOutputs } from '~/utils/trpc'
import Streak from './streak'

interface Props {
	streaks: RouterOutputs['streak']['getBest']
}

const Streaks = ({ streaks }: Props) => {
	return (
		<Card>
			<Title>Your best streaks</Title>
			<div className="">
				{streaks.map((streak, index, arr) => {
					//I presume that the first streak is the longest one
					const maxStreakLength = arr[0]?.length
					return (
						<Streak
							streak={streak}
							key={index}
							maxStreakLength={maxStreakLength!}
						/>
					)
				})}
			</div>
		</Card>
	)
}

export default Streaks
