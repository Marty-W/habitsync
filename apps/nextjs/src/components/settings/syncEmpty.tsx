import Link from 'next/link'
import { CircleSlash } from 'lucide-react'

import { Button } from '../ui/button'
import Recap from './recap'
import type { SyncSourceType } from './syncList'

interface Props {
	sourceType: SyncSourceType
}

const SyncEmpty = ({ sourceType }: Props) => {
	const otherSyncType = sourceType === 'project' ? 'label' : 'project'
	return (
		<Recap
			icon={<CircleSlash size={50} className="text-sprimary" />}
			text="There are no new tasks to sync. Pick another source."
		>
			<Button variant="link" asChild>
				<Link href={`/settings/sync-new-habits/${otherSyncType}s`}>
					Sync by {otherSyncType}s
				</Link>
			</Button>
			<Button asChild>
				<Link href="/habits">Go to dashboard</Link>
			</Button>
		</Recap>
	)
}

export default SyncEmpty
