import React from 'react'

import Container from './container'

interface Props {
	align?: 'left' | 'right'
	pretitle?: string
	title?: string
	children: React.ReactNode
}

const SectionTitle = ({ align, pretitle, title, children }: Props) => {
	return (
		<Container
			className={`mt-4 flex w-full flex-col ${
				align === 'left' ? '' : 'items-center justify-center text-center'
			}`}
		>
			{pretitle && (
				<div className="text-sm font-bold uppercase tracking-wider text-blue-600">
					{pretitle}
				</div>
			)}

			{title && (
				<h2 className="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight">
					{title}
				</h2>
			)}

			{children && (
				<p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
					{children}
				</p>
			)}
		</Container>
	)
}

export default SectionTitle
