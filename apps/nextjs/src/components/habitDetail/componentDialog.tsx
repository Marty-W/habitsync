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
	text: React.ReactNode
}

const ComponentDialog = ({ title, text }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<Info size={18} />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{text}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default ComponentDialog
