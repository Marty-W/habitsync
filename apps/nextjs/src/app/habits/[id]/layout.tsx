import { redirect } from 'next/navigation'

import { auth } from '@habitsync/auth'

interface Props {
	children: React.ReactNode
}

const Layout = async ({ children }: Props) => {
	const session = await auth()

	if (!session) {
		redirect('/api/auth/signin/')
	}
	return <div>{children}</div>
}

export default Layout
