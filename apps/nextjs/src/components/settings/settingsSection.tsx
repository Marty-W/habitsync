interface Props {
	title: string
	children: React.ReactNode
	dialog?: React.ReactNode
}

const SettingsSection = ({ title, children, dialog }: Props) => {
	return (
		<div className="mb-4">
			<div className="mb-2 flex items-center">
				<h2 className="text-ssecondary-foreground text-md mr-2 font-semibold">
					{title.toUpperCase()}
				</h2>
				{dialog}
			</div>
			<div className="dark:divide-sprimary/10 bg-scard flex flex-col divide-y rounded-lg px-2">
				{children}
			</div>
		</div>
	)
}

export default SettingsSection
