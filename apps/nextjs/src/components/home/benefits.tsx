import type { ReactNode } from 'react'
import React from 'react'
import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import type { LucideIcon } from 'lucide-react'

import Carousel from './carousel'
import Container from './container'

export interface CarouselImg {
	image: StaticImport
	caption: string
}

export interface BaseBenefitData {
	title: string
	desc: string
	bullets: {
		title: string
		desc: string
		icon: LucideIcon
	}[]
}

export interface CarouselBenefitData extends BaseBenefitData {
	visual: 'carousel'
	images: CarouselImg[]
}

export interface ImageBenefitData extends BaseBenefitData {
	visual: 'image'
	image: StaticImageData
}

const Benefits = ({
	data,
	imgPos,
}: {
	data: CarouselBenefitData | ImageBenefitData
	imgPos?: 'right' | undefined
}) => {
	const { title, desc, bullets, visual } = data
	return (
		<>
			<Container className="mb-20 flex flex-wrap lg:flex-nowrap lg:gap-10 ">
				<div
					className={`flex w-full items-center justify-center lg:w-1/2 ${
						imgPos === 'right' ? 'lg:order-1' : ''
					}`}
				>
					<div>
						{visual === 'image' ? (
							<Image
								src={data.image}
								width="521"
								height="auto"
								alt="Benefits"
								className={'object-cover'}
								placeholder="blur"
							/>
						) : (
							<Carousel images={data.images} />
						)}
					</div>
				</div>

				<div
					className={`flex w-full flex-wrap items-center lg:w-1/2 ${
						imgPos === 'right' ? 'lg:justify-end' : ''
					}`}
				>
					<div>
						<div className="mt-4 flex w-full flex-col">
							<h3 className="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight">
								{title}
							</h3>

							<p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl">
								{desc}
							</p>
						</div>

						<div className="mt-5 w-full">
							{bullets.map((item, index) => (
								<Benefit key={index} title={item.title} icon={item.icon}>
									{item.desc}
								</Benefit>
							))}
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}

interface BenefitProps {
	icon: LucideIcon
	title: string
	children: ReactNode
}

function Benefit({ icon: Icon, title, children }: BenefitProps) {
	return (
		<>
			<div className="mt-8 flex items-start space-x-3">
				<div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-blue-500 ">
					<Icon className="h-6 w-6 text-white" />
				</div>
				<div>
					<h4 className="text-xl font-medium text-gray-500">{title}</h4>
					<p className="mt-1 text-gray-400">{children}</p>
				</div>
			</div>
		</>
	)
}

export default Benefits
