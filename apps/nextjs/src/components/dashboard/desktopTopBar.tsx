'use client'

import { Settings } from 'lucide-react'

import { api } from '~/utils/trpc'
import DesktopWrapper from '../settings/desktop/desktopWrapper'
import BrandIcon from '../ui/brandIcon'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '../ui/dialog'
import ThemeToggle from '../ui/themeToggle'

const DesktopTopBar = () => {
	const utils = api.useContext()

	const handleModalChange = async (open: boolean) => {
		if (!open) {
			await utils.habit.getAll.invalidate()
		}
	}

	return (
		<div className="flex items-end justify-between py-4">
			<div className="h-16 w-16">
				<BrandIcon />
			</div>
			<div className="flex space-x-2">
				<ThemeToggle />
				<Dialog onOpenChange={handleModalChange}>
					<DialogTrigger>
						<Button variant="outline" size="icon">
							<Settings size="1.2rem" />
						</Button>
					</DialogTrigger>
					<DialogContent className="p-8">
						<DesktopWrapper />
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

export default DesktopTopBar
