import { ScrollArea } from '~/components/ui/scrollArea'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select'
import type { SyncSources } from '~/app/settings/sync-new-habits/labels/page'

interface Props {
	selectValues: SyncSources
	onValueChange: (value: string) => void
	sourceType: 'project' | 'label'
}

const SyncSourceSelect = ({
	selectValues,
	onValueChange,
	sourceType,
}: Props) => {
	return (
		<Select onValueChange={onValueChange}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder={`Your ${sourceType}s`} />
			</SelectTrigger>
			<SelectContent>
				<ScrollArea className="h-[400px]">
					{selectValues.map((item) => {
						return (
							<SelectItem
								value={sourceType === 'label' ? item.name : item.id}
								key={item.id}
							>
								{item.name}
							</SelectItem>
						)
					})}
				</ScrollArea>
			</SelectContent>
		</Select>
	)
}

export default SyncSourceSelect
