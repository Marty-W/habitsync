import { Info } from 'lucide-react'

import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'

interface Props {
	title: string
	children: React.ReactNode
}

const ComponentDialog = ({ title, children }: Props) => {
	return (
		<Dialog>
			<DialogTrigger>
				<Button variant="ghost">
					<Info size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{children}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default ComponentDialog
