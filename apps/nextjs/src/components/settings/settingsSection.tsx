interface Props {
	title: string
	children: React.ReactNode
	dialog?: React.ReactNode
}

const SettingsSection = ({ title, children, dialog }: Props) => {
	return (
		<div className="mb-4">
			<div className="mb-1 flex items-center">
				<h2 className="text-muted-foreground mr-2 text-sm">
					{title.toUpperCase()}
				</h2>
				{dialog}
			</div>
			<div className="bg-card text-card-foreground divide-muted-foreground/5 grid grid-cols-1 divide-y-2 rounded-lg shadow-sm">
				{children}
			</div>
		</div>
	)
}

export default SettingsSection
