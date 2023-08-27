import Link from 'next/link'
import type { ClassValue } from 'clsx'
import { Settings } from 'lucide-react'

import { cn } from '~/utils/tailwind'
import { Button } from './ui/button'

interface Props {
	className?: ClassValue
	from?: string
	link?: string
}

const SettingsButton = ({ className, from, link }: Props) => {
	return (
		<Button variant="outline" size="icon" className={cn(className)} asChild>
			<Link href={link ?? `/settings?from=${from}`}>
				<Settings size="1.2rem" />
			</Link>
		</Button>
	)
}

export default SettingsButton
