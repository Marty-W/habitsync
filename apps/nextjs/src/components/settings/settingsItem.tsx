import type { PropsWithChildren } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '~/utils/tailwind'

interface SettingsItemBaseProps {
	title: string
	className?: string
	Icon: LucideIcon
}

export const SettingsItem = ({
	Icon,
	title,
	children,
}: PropsWithChildren<SettingsItemBaseProps>) => {
	return (
		<div className="flex h-14 items-center">
			<Icon size={20} />
			<span className="px-3 text-lg">{title}</span>
			<div className="ml-auto">{children}</div>
		</div>
	)
}

interface SettingsItemLinkProps extends SettingsItemBaseProps {
	href: string
}

export const SettingsItemLink = ({
	href,
	className,
	title,
	Icon,
}: SettingsItemLinkProps) => {
	return (
		<div className="flex h-14 items-center">
			<Icon size={20} />
			<Link
				href={href}
				className={cn(
					'flex w-full items-center justify-between px-3 ',
					className,
				)}
			>
				<span className="text-lg">{title}</span>
				<ChevronRight size={20} />
			</Link>
		</div>
	)
}

interface SettingsItemButtonProps extends SettingsItemBaseProps {
	onClick?: () => void
}

export const SettingsItemButton = ({
	onClick,
	className,
	title,
	Icon,
}: SettingsItemButtonProps) => {
	return (
		<div className="flex h-14 items-center">
			<Icon size={20} />
			<button
				className={cn(
					'flex w-full items-center justify-between px-3 ',
					className,
				)}
				onClick={onClick}
			>
				<span className="text-lg">{title}</span>
			</button>
		</div>
	)
}
