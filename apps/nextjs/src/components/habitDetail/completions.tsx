import { Card, Title } from '@tremor/react'

import Counter from '~/components/ui/animatedCounter'

interface Props {
	completions: number
}

const TotalCompletions = ({ completions }: Props) => {
	return (
		<Card>
			<Title>Completed</Title>
			<Counter
				from={0}
				to={completions}
				className="text-ssecondary-foreground text-tremor-metric font-semibold"
				animationDuration={3}
				postValue={completions > 1 ? ' times' : ' time'}
			/>
		</Card>
	)
}

export default TotalCompletions
