import { CalendarCheck, CheckCheck } from 'lucide-react'

import { Checkbox } from '../ui/checkbox'

interface CommonProps {
	name: string
	id: string
	isSelected: boolean
	handleSelect: (id: string) => void
}

interface PassiveProps extends CommonProps {
	kind: 'add'
}

interface ActiveProps extends CommonProps {
	kind: 'edit'
	numOfTimestamps: number
}

type Props = PassiveProps | ActiveProps

const HabitListItem = (props: Props) => {
	return (
		<div className="bg/95 border-smuted-foreground flex h-16 w-full items-center">
			<Checkbox
				className="mr-4 h-5 w-5 rounded-md"
				checked={props.isSelected}
				onCheckedChange={() => props.handleSelect(props.id)}
			/>
			<span className="text-xl">{props.name}</span>
			{props.kind === 'edit' && (
				<div className="ml-auto flex items-center">
					<CalendarCheck className="mr-2 inline-block" size={16} />
					<span className="text-sm">{props.numOfTimestamps}</span>
				</div>
			)}
			{props.kind === 'add' && (
				<div className="ml-auto flex items-center">
					<CheckCheck
						className="text-saccent-foreground/20 mr-2 inline-block"
						size={16}
					/>
				</div>
			)}
		</div>
	)
}

export default HabitListItem
