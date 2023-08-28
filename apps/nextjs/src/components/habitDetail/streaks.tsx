import { Card, Title } from '@tremor/react'

import { api } from '~/utils/trpc'
import DetailError from './detailError'
import Streak from './streak'

interface Props {
	habitId: string
}

const Streaks = ({ habitId }: Props) => {
	const streaks = api.streak.getBest.useQuery(
		{ habitId, numStreaks: 5 },
		{
			retry: false,
			retryOnMount: false,
		},
	)

	if (streaks.isLoading) return null

	if (streaks.error) {
		return (
			<Card className="2xl:h-fit">
				<Title>Your best streaks</Title>
				<DetailError>{streaks.error.message}</DetailError>
			</Card>
		)
	}

	return (
		<Card className="min-h-max 2xl:h-fit">
			<Title>Your best streaks</Title>
			<div className="">
				{streaks.data.map((streak, index, arr) => {
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
