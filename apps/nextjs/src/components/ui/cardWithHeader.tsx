import type {LucideIcon} from 'lucide-react';

import { cn } from '~/utils/tailwind'

interface Props {
	title: string
	icon: LucideIcon
	children: React.ReactNode
	className?: string
}

const CardWithHeader = ({ title, icon: Icon, children, className }: Props) => {
	return (
		<div
			className={cn(
				'bg-scard  rounded-2xl px-6 pb-6 pt-4 shadow-lg',
				className,
			)}
		>
			<div className="text-smuted-foreground/40 mb-5 flex items-center">
				<Icon className="mr-2" size={30} strokeWidth={1} />
				<h1 className="font-light">{title}</h1>
			</div>
			<div className="">{children}</div>
		</div>
	)
}

export default CardWithHeader
