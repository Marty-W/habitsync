import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { auth } from '@habitsync/auth'

export const metadata: Metadata = {
	title: 'Settings',
}

const Layout = async (props: { children: React.ReactNode }) => {
	const session = await auth()

	if (!session) {
		redirect('/api/auth/signin/')
	}

	return <section className="bg-smuted h-screen">{props.children}</section>
}

export default Layout
