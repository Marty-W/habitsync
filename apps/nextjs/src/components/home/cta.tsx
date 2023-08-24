import React from 'react'

import { SignIn } from '../auth'
import Container from './container'

const Cta = () => {
	return (
		<Container>
			<div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-5 rounded-xl bg-blue-600 px-7 py-7 text-white lg:flex-nowrap lg:px-12 lg:py-12">
				<div className="flex-grow text-center lg:text-left">
					<h2 className="text-2xl font-medium lg:text-3xl">
						Ready to elevate your Todoist experience?
					</h2>
					<p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
						Dive into advanced habit analytics and visualizations with
						HabitSync.
					</p>
				</div>
				<div className="w-full flex-shrink-0 text-center lg:w-auto">
					<SignIn
						provider="todoist"
						className="mx-auto inline-block rounded-md bg-white px-7 py-3 text-center text-lg font-medium text-blue-600 lg:px-10 lg:py-5"
					>
						Try for Free
					</SignIn>
				</div>
			</div>
		</Container>
	)
}

export default Cta
