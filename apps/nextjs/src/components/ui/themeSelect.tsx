import * as React from 'react'
import { useTheme } from 'next-themes'

import { cn } from '~/utils/tailwind'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '~/components/ui/select'

interface Props {
	className?: string
}

const ThemeSelect = ({ className }: Props) => {
	const { setTheme, theme } = useTheme()

	return (
		<Select onValueChange={(value) => setTheme(value)}>
			<SelectTrigger className={cn('h-full w-[80px]', className)}>
				<SelectValue placeholder={theme} />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="light">light</SelectItem>
				<SelectItem value="dark">dark</SelectItem>
				<SelectItem value="system">system</SelectItem>
			</SelectContent>
		</Select>
	)
}

export default ThemeSelect
