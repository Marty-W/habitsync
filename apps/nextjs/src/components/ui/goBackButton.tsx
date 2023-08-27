'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

import { Button } from './button'

interface Props {
	className?: string
	iconSize?: number
	to: string
}
const GoBackButton = ({ className, iconSize = 24, to }: Props) => {
	return (
		<Button variant="ghost" size="icon" className={className} asChild>
			<Link href={to}>
				<ChevronLeft size={iconSize} />
			</Link>
		</Button>
	)
}

export default GoBackButton
