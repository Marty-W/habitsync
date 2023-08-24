import type {PropsWithChildren} from 'react';

import { cn } from '~/utils/tailwind'

const Card = ({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) => (
	<div className={cn('bg-scard rounded-2xl p-6 shadow-lg', className)}>
		{children}
	</div>
)

export default Card
