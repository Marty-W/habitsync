import { Card, Icon, Title } from '@tremor/react'
import { Tally5 } from 'lucide-react'

import Counter from '~/components/ui/animatedCounter'

interface Props {
	completions: number
}

const TotalCompletions = ({ completions }: Props) => {
	return (
		<Card className="flex items-center space-x-4">
			<Icon icon={Tally5} size="xl" variant="light" />
			<div>
				<Title>Completed</Title>
				<Counter
					from={0}
					to={completions}
					className="text-ssecondary-foreground text-tremor-metric font-semibold"
					animationDuration={3}
					postValue={completions > 1 ? ' times' : ' time'}
				/>
			</div>
		</Card>
	)
}

export default TotalCompletions
