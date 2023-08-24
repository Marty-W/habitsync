import React from 'react'

import { cn } from '~/utils/tailwind'

interface Props {
	className?: string
	children: React.ReactNode
	id?: string
}

const Container = ({ className, children, id }: Props) => {
	return (
		<div className={cn('container mx-auto p-8 xl:px-0', className)} id={id}>
			{children}
		</div>
	)
}

export default Container
