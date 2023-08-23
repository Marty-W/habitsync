import React from 'react'

import { cn } from '~/utils/tailwind'

interface Props {
	className?: string
	children: React.ReactNode
}

const Container = ({ className, children }: Props) => {
	return (
		<div className={cn('container mx-auto p-8 xl:px-0', className)}>
			{children}
		</div>
	)
}

export default Container
