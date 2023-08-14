import type { ComponentPropsWithoutRef, ElementType } from 'react'
import { ChevronRight } from 'lucide-react'
import type { Icon } from 'lucide-react'

import { cn } from '~/utils/tailwind'

const ButtonDefaultAsType = 'button'
type ButtonDefaultAsType = typeof ButtonDefaultAsType

interface ItemOwnProps<E extends ElementType> {
	as?: E
	title: string
	className?: string
	children?: React.ReactNode
	Icon: Icon
}

type ItemProps<E extends ElementType> = ItemOwnProps<E> &
	Omit<ComponentPropsWithoutRef<E>, keyof ItemOwnProps<E>>

const SettingsItem = <E extends ElementType = ButtonDefaultAsType>({
	as,
	title,
	className,
	children,
	Icon,
	...delegated
}: ItemProps<E>) => {
	const Tag = as ?? ButtonDefaultAsType

	return (
		<div className="flex h-14 items-center justify-center">
			<Icon size={20} />
			<Tag
				{...delegated}
				className={cn(
					'flex w-full items-center justify-between px-3 ',
					className,
				)}
			>
				<span className="text-lg">{title}</span>
				{as !== 'button' && <ChevronRight size={20} />}
				{children}
			</Tag>
		</div>
	)
}

export default SettingsItem
