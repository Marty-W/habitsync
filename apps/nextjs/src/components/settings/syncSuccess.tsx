import { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BadgeCheck } from 'lucide-react'

import {
	SettingsModalContext,
	useIsSettingsModalOpen,
} from '~/hooks/useSettingsModalContext'
import { Button } from '../ui/button'
import Recap from './recap'
import type { SyncSourceType } from './syncList'

interface Props {
	numOfHabitsCreated: number
	sourceType: SyncSourceType
	handleSyncAgain: () => void
}

const SyncSuccess = ({
	numOfHabitsCreated,
	sourceType,
	handleSyncAgain,
}: Props) => {
	const otherSyncType = sourceType === 'project' ? 'label' : 'project'
	const text = `Congratulations. You've synced ${numOfHabitsCreated} habit${
		numOfHabitsCreated > 1 ? 's' : ''
	}.`
	const modalContext = useContext(SettingsModalContext)

	const isMobile = usePathname()?.includes('settings')

	return (
		<Recap
			icon={<BadgeCheck size={50} className="text-green-400" />}
			text={text}
		>
			<div className="flex min-w-max justify-center">
				<Button variant="link">
					<Link href={`/settings/sync-new-habits/${otherSyncType}s`}>
						Sync by {otherSyncType}s{' '}
					</Link>
				</Button>
				<Button size="sm" onClick={handleSyncAgain} variant="link">
					Sync again
				</Button>
			</div>
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

export default SyncSuccess
