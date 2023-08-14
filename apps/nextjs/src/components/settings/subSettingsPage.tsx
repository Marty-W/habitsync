import GoBackButton from '../ui/goBackButton'

interface Props {
	title: string
	children: React.ReactNode
}
const SubSettingsPage = ({ title, children }: Props) => {
	return (
		<div className="flex max-h-screen flex-col px-4 pt-3">
			<div className="grid grid-cols-[100px_1fr_100px] items-center">
				<GoBackButton to="/settings" />
				<h1 className="text-saccent-foreground col-start-2 my-5 text-center text-xl">
					{title}
				</h1>
			</div>
			<div className="flex-1 overflow-y-auto">{children}</div>
		</div>
	)
}

export default SubSettingsPage
