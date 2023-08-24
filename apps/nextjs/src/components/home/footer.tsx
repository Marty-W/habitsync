import Link from 'next/link'

import BrandIcon from '~/components/ui/brandIcon'
import Container from './container'

const Footer = () => {
	return (
		<div className="relative">
			<Container>
				<div className="mx-auto mt-5 grid max-w-screen-xl grid-cols-1 gap-10 border-t border-gray-100 pt-10 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<div>
							<Link
								href="/"
								className="flex items-center space-x-2 text-2xl font-medium text-blue-500"
							>
								<BrandIcon width={60} height={60} />
								<span>HabitSync</span>
							</Link>
						</div>

						<div className="mt-4 max-w-md text-gray-500 ">
							HabitSync takes your Todoist tasks to the next level with
							insightful analytics and visualizations.
						</div>
					</div>

					<div className="text-center">
						<div>Contact Us</div>
						<div className="mt-5 text-gray-400">
							{/* TODO create and change email */}
							<a href="mailto:habitsync@email.com">habitsync@email.com</a>
						</div>
					</div>
				</div>

				<div className="my-10 text-center text-sm text-gray-600">
					Made with ♥ by Martin Weber.
				</div>
			</Container>
		</div>
	)
}

export default Footer
