interface Props {
	icon: React.ReactNode
	text: string
	children: React.ReactNode
}

const Recap = ({ icon, children, text }: Props) => {
	return (
		<div>
			<div className="my-5 flex w-full flex-col items-center">
				<div className="mb-3">{icon}</div>
				<p className="text-lg">{text}</p>
			</div>
			<div className="mx-auto flex flex-col gap-3">{children}</div>
		</div>
	)
}

export default Recap
