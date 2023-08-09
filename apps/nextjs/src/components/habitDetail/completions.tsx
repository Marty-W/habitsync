import Counter from '~/components/ui/animatedCounter'

interface Props {
	completions: number
}

const TotalCompletions = ({ completions }: Props) => {
	return (
		<div className="text-center">
			<div className="text-md text-muted-foreground mb-3">
				<span>Completed</span>
			</div>
			<div className="relative">
				<Counter
					from={0}
					to={completions}
					className="text-3xl"
					animationDuration={2}
					postValue={completions > 1 ? ' times' : ' time'}
				/>
			</div>
		</div>
	)
}

export default TotalCompletions
