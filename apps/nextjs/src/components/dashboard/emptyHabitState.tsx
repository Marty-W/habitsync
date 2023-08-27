'use client'

import { useContext, useState } from 'react'
import Link from 'next/link'

import { Button } from '~/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '~/components/ui/dialog'
import { SettingsModalContext } from '~/hooks/useSettingsModalContext'
import { DialogHeader } from '../ui/dialog'

const EmptyHabitState = () => {
	const isMobile = window.innerWidth <= 1023
	const settingsModal = useContext(SettingsModalContext)
	const [modalOpen, setModalOpen] = useState(false)

	const handleDesktopSettingsRedirect = (
		newView: 'sync-projects' | 'sync-labels',
	) => {
		if (settingsModal) {
			setModalOpen(false)
			settingsModal.mountAndChangeView(newView)
		}
	}
	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<div className="text-smuted-foreground flex flex-col px-10 text-center text-xl">
				<h3 className="mb-4">You don&apos;t have any habits yet.</h3>
				<DialogTrigger asChild>
					<Button size="lg">Sync habits</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Sync options</DialogTitle>
						<DialogDescription>
							Effortlessly import tasks from Todoist projects or labels. Select
							a project or label, and we&apos;ll fetch your tasks. Handpick the
							ones you want as habits, and we&apos;ll save them to your
							dashboard for easy tracking with insightful graphs.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-center space-x-4">
						{isMobile ? (
							<>
								<Button asChild>
									<Link href="/settings/sync-new-habits/projects">
										Projects
									</Link>
								</Button>
								<Button asChild>
									<Link href="/settings/sync-new-habits/labels">Labels</Link>
								</Button>
							</>
						) : (
							<>
								<Button
									onClick={() => handleDesktopSettingsRedirect('sync-projects')}
								>
									Projects
								</Button>
								<Button
									onClick={() => handleDesktopSettingsRedirect('sync-labels')}
								>
									Labels
								</Button>
							</>
						)}
					</DialogFooter>
				</DialogContent>
			</div>
		</Dialog>
	)
}

export default EmptyHabitState
