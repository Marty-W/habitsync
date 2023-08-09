import { cn } from '~/utils/tailwind'

interface Props {
	className?: string
	tag: string
}

const Tag = ({ tag, className }: Props) => {
	return (
		<div className={cn(className, 'p-2')}>
			<span className="text-muted-foreground select-none rounded-md border-2 px-2 py-1 text-sm">
				{tag}
			</span>
		</div>
	)
}

export default Tag
