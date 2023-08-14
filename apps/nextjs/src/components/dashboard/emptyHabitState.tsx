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
import { DialogHeader } from '../ui/dialog'

const EmptyHabitState = () => {
	return (
		<Dialog>
			<div className="text-smuted-foreground flex flex-col px-10 text-center text-xl">
				<h3 className="mb-4">You don`t have any habits yet.</h3>
				<DialogTrigger asChild>
					<Button size="lg">Sync habits</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Sync options</DialogTitle>
						<DialogDescription>
							Effortlessly import tasks from Todoist projects or labels. Select
							a project or label, and we'll fetch your tasks. Handpick the ones
							you want as habits, and we'll save them to your dashboard for easy
							tracking with insightful graphs.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex justify-center space-x-4">
						<Button>
							<Link href="/settings/sync-new-habits/projects">Projects</Link>
						</Button>
						<Button>
							<Link href="/settings/sync-new-habits/labels">Labels</Link>
						</Button>
					</DialogFooter>
				</DialogContent>
			</div>
		</Dialog>
	)
}

export default EmptyHabitState
