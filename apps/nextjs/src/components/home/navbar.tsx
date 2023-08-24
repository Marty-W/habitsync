import { Suspense } from 'react'
import Link from 'next/link'

import { auth } from '@habitsync/auth'

import { Button } from '~/components/ui/button'
import BrandIcon from '../../components/ui/brandIcon'
import { SignIn, SignOut } from '../auth'

const Navbar = () => {
	const navigation = [
		{ name: 'Features', href: '#features' },
		{ name: 'FAQ', href: '#faq' },
	]

	return (
		<div className="w-full">
			<nav className="container relative mx-auto flex flex-wrap items-center justify-between p-8 lg:justify-between xl:px-0">
				<Link href="/">
					<span className="flex items-center space-x-2 text-2xl font-medium text-blue-500">
						<BrandIcon width={60} height={60} className="stroke-blue-500" />
						<span>Habitsync</span>
					</span>
				</Link>

				{/* menu  */}
				<div className="hidden text-center lg:flex lg:items-center">
					<ul className="flex-1 list-none items-center justify-end pt-6 lg:flex lg:pt-0">
						{navigation.map((menu, index) => (
							<li className="nav__item mr-3" key={index}>
								<Link
									href={menu.href}
									className="inline-block rounded-md px-4 py-2 text-lg font-normal text-gray-800 no-underline hover:text-blue-500 focus:bg-blue-100 focus:text-blue-500 focus:outline-none"
								>
									{menu.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div className="mr-3 hidden space-x-4 lg:flex">
					<Suspense fallback={<span>...</span>}>
						<NavAuth />
					</Suspense>
				</div>
			</nav>
		</div>
	)
}

const NavAuth = async () => {
	const session = await auth()

	if (!session) {
		return (
			<Button variant="secondary">
				<SignIn provider="google">Sign in</SignIn>
			</Button>
		)
	}

	return (
		<Button variant="secondary">
			<SignOut>Sign out</SignOut>
		</Button>
	)
}

export default Navbar
