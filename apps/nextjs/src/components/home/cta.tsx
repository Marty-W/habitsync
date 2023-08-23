import React from 'react'

import Container from './container'

const Cta = () => {
	return (
		<Container>
			<div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-5 rounded-xl bg-indigo-600 px-7 py-7 text-white lg:flex-nowrap lg:px-12 lg:py-12">
				<div className="flex-grow text-center lg:text-left">
					<h2 className="text-2xl font-medium lg:text-3xl">
						Ready to try-out this template?
					</h2>
					<p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
						Don&apos;t let your visitors see a poor landing.
					</p>
				</div>
				<div className="w-full flex-shrink-0 text-center lg:w-auto">
					<a
						href="https://github.com/web3templates"
						target="_blank"
						rel="noopener noreferrer"
						className="mx-auto inline-block rounded-md bg-white px-7 py-3 text-center text-lg font-medium text-indigo-600 lg:px-10 lg:py-5 "
					>
						Download for Free
					</a>
				</div>
			</div>
		</Container>
	)
}

export default Cta
