import { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BadgeCheck, Settings } from 'lucide-react'

import type { EditHabitType } from '~/app/settings/edit-habits/page'
import { SettingsModalContext } from '~/hooks/useSettingsModalContext'
import { Button } from '../ui/button'
import Recap from './recap'

interface Props {
	numOfMutations: number
	handleEditMore: () => void
	type: EditHabitType
}

const getEditTypeText = (type: EditHabitType, numOfMutations: number) => {
	if (type === 'delete-habits') {
		return `Congratulations, you've deleted ${numOfMutations} habit${
			numOfMutations > 1 ? 's' : ''
		}.`
	}
	return `Congratulations, you've deleted ${numOfMutations} timestamp${
		numOfMutations > 1 ? 's' : ''
	}.`
}

const EditSuccess = ({ numOfMutations, handleEditMore, type }: Props) => {
	const text = getEditTypeText(type, numOfMutations)
	const isMobile = usePathname()?.includes('settings')
	const modalContext = useContext(SettingsModalContext)

	return (
		<Recap
			icon={<BadgeCheck size={50} className="text-green-400" />}
			text={text}
		>
			<Button size="sm" onClick={handleEditMore} variant="link">
				Edit more
			</Button>
			{isMobile ? (
				<Button>
					<Link href="/habits">Go to dashboard</Link>
				</Button>
			) : (
				<Button onClick={() => modalContext?.closeAndIvalidate()}>
					Go to dashboard
				</Button>
			)}
		</Recap>
	)
}

export default EditSuccess
