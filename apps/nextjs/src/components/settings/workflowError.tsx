import { AlertCircle, PlusCircle } from 'lucide-react'

interface Props {
	errorMessage: string
	kind: 'error' | 'empty'
}

const WorkflowError = ({ errorMessage, kind }: Props) => {
	return (
		<div className="text-smuted-foreground/40 mx-10 flex flex-col items-center justify-center">
			{kind === 'error' && <AlertCircle size={40} className="mx-auto my-4" />}
			{kind === 'empty' && <PlusCircle size={48} className="mx-auto my-4" />}
			<p className="text-md text-center">{errorMessage}</p>
		</div>
	)
}

export default WorkflowError
