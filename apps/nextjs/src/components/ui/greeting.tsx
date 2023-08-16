import useTimeSensitiveGreeting from '~/hooks/useTimeSensitiveGreeting'

const Greeting = () => {
	const greeting = useTimeSensitiveGreeting()
	return (
		<h1 className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-4xl text-transparent">
			{greeting}
		</h1>
	)
}

export default Greeting
