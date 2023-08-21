import { Card, Icon, Title } from '@tremor/react'
import { Activity } from 'lucide-react'

import Counter from '~/components/ui/animatedCounter'

interface Props {
	rate: string
}

const SuccessRate = ({ rate }: Props) => {
	return (
		<Card className="flex items-center space-x-4">
			<Icon icon={Activity} size="xl" variant="light" />
			<div>
				<Title>Hits</Title>
				<Counter
					from={0}
					to={Number(rate)}
					className="text-ssecondary-foreground text-tremor-metric font-semibold"
					animationDuration={3}
					postValue=" %"
				/>
			</div>
		</Card>
	)
}

export default SuccessRate
