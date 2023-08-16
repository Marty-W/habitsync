import { cn } from '~/utils/tailwind'

interface Props {
	variant: string
}

const HalvedPill = ({ variant }: Props) => {
	return (
		<div className="relative flex flex-col">
			<div
				className={cn(
					'w-10px mx-1 h-3.5 w-[10px] rounded-t-lg',
					variant === 'success' ? 'bg-green-400' : 'bg-gray-300',
				)}
			/>
			<div
				className={cn(
					'w-10px mx-1 h-3.5 w-[10px] rounded-b-lg',
					variant === 'success' ? 'bg-green-400' : 'bg-red-400',
				)}
			/>
		</div>
	)
}

export default HalvedPill
