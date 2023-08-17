import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { cn } from '~/utils/tailwind'
import type { RouterOutputs } from '~/utils/trpc'
import useCompletionPillsData from '~/hooks/useCompletionPillsData'
import CompletionsRow from './completionsRow'

interface Props {
	habit: RouterOutputs['habit']['getAll'][0]
}

const DashboardHabit = ({ habit }: Props) => {
	const { id, name } = habit
	const isFirstLoad = useSearchParams()?.get('firstLoad')
	const { timestamps, habitDetail } = useCompletionPillsData({ habitId: id })
	const noTimestamps = timestamps.data?.timestamps.size === 0

	if (timestamps.isLoading || habitDetail.isLoading) {
		return null
	}

	if (timestamps.error ?? habitDetail.error) {
		return (
			<span className="text-smuted-foreground">
				There was an error fetching your completions.
			</span>
		)
	}

	return (
		// TODO add some visual clue that there is no data yet
		<Link href={noTimestamps ? '#' : `/habits/${id}?name=${name}`}>
			<div
				className={cn(
					'bg-scard hover:bg-saccent/70 text-scard-foreground flex items-center justify-between rounded-lg border p-5 shadow-sm',
					isFirstLoad && 'animate-fade-in',
				)}
			>
				<span className="flex-1">{name}</span>
				<CompletionsRow
					timestampData={timestamps.data}
					habitDetail={habitDetail.data}
				/>
			</div>
		</Link>
	)
}

export default DashboardHabit
