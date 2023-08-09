import { Loader2 } from 'lucide-react'

import { cn } from '~/utils/tailwind'

interface Props {
	size?: number
	className?: string
}

const Spinner = ({ size = 32, className }: Props) => {
	return <Loader2 className={cn(className, 'animate-spin')} size={size} />
}

export default Spinner
