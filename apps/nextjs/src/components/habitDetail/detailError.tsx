import { AlertCircle } from 'lucide-react'

interface Props {
	children: React.ReactNode
}

const DetailError = ({ children }: Props) => {
	return (
		<div className="flex flex-1 items-center justify-center">
			<AlertCircle size={20} className="text-sdestructive mr-2" />
			<p>{children}</p>
		</div>
	)
}

export default DetailError
