import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select'
import { type ActivePeriod } from './completionsGraph'

interface Props {
	activePeriod: ActivePeriod
	setPeriod: (period: ActivePeriod) => void
}

const CompletionsGraphSelect = ({ activePeriod, setPeriod }: Props) => {
	return (
		<Select onValueChange={(value) => setPeriod(value as ActivePeriod)}>
			<SelectTrigger className="h-full w-[80px]">
				<SelectValue placeholder={activePeriod} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="week">week</SelectItem>
				<SelectItem value="month">month</SelectItem>
				<SelectItem value="year">year</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default CompletionsGraphSelect
