import type { QueryObserverResult } from '@tanstack/react-query'

import { cn } from '~/utils/tailwind'
import ClickSpinner from './clickSpinner'

interface Props {
	className?: string
	refetch: (options?: {
		throwOnError?: boolean
	}) => Promise<QueryObserverResult> | Promise<void>
	isRefetching: boolean
	children: React.ReactNode
}
const FetchError = ({ className, refetch, isRefetching, children }: Props) => {
	const handleRedoClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		await refetch()
	}

	return (
		<div
			className={cn(
				'text-smuted-foreground flex flex-col items-center justify-center',
				className,
			)}
		>
			<button onClick={handleRedoClick} className="mb-3">
				<ClickSpinner isActive={isRefetching} className="h-8 w-8" />
			</button>
			{children}
		</div>
	)
}

export default FetchError
