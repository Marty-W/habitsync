import React, { useMemo } from 'react'
import { format } from 'date-fns'
import { motion } from 'framer-motion'

import type { RouterOutputs } from '@habitsync/api'

import { cn } from '~/utils/tailwind'

interface Props {
	streak: RouterOutputs['streak']['getBest'][0]
	maxStreakLength: number
}

const STREAK_TIME_FORMAT = 'MMM d'

const Streak = ({ streak, maxStreakLength }: Props) => {
	const streakOpts = useMemo(() => {
		return {
			formattedStart: format(new Date(streak.start), STREAK_TIME_FORMAT),
			formattedEnd: format(new Date(streak.end), STREAK_TIME_FORMAT),
			barWidth: (streak.length / maxStreakLength) * 100,
		}
	}, [maxStreakLength, streak.end, streak.length, streak.start])

	return (
		<div className="my-4 grid h-8 grid-cols-[70px_1fr_70px] place-content-center place-items-center">
			<span className="text-muted-foreground text-sm">
				{streakOpts.formattedStart}
			</span>
			<div
				className={`relative flex h-6 w-full items-center justify-center justify-self-center rounded-xl shadow-inner`}
			>
				<motion.div
					style={{ minWidth: '30px', height: '25px' }}
					className="bg-tremor-brand flex items-center justify-center rounded-xl"
					initial={{ width: 0 }}
					animate={{ width: `${streakOpts.barWidth}%` }}
					transition={{ duration: 4 }}
				>
					<span className="text-tremor-brand-faint text-lg">
						{streak.length}
					</span>
				</motion.div>
				<span
					className={cn(
						'absolute right-2 text-xs',
						maxStreakLength === streak.length && 'text-tremor-brand-faint',
					)}
				>
					days
				</span>
			</div>
			<span className="text-content text-sm">{streakOpts.formattedEnd}</span>
		</div>
	)
}

export default React.memo(Streak)
