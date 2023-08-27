import { useEffect, useState } from 'react'

// Some components (think useTheme) throw hydration errors (you can't use them on the server side), this hook will render them after the component has mounted

const useRenderAfterMount = (component: React.ReactNode) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null

	return component
}

export default useRenderAfterMount
