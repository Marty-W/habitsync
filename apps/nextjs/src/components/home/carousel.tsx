'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import type { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel-react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { CarouselImg } from './benefits'

interface Props {
	options?: EmblaOptionsType
	images: CarouselImg[]
}

const Carousel = ({ options, images }: Props) => {
	const [emblaRef, emblaApi] = useEmblaCarousel(options)
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
	const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

	const getImageByIndex = useCallback(
		(index: number) => {
			return images[index % images.length]
		},
		[images],
	)

	const scrollPrev = useCallback(
		() => emblaApi && emblaApi.scrollPrev(),
		[emblaApi],
	)
	const scrollNext = useCallback(() => {
		emblaApi && emblaApi.scrollNext()
	}, [emblaApi])

	const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
		setPrevBtnDisabled(!emblaApi.canScrollPrev())
		setNextBtnDisabled(!emblaApi.canScrollNext())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		onSelect(emblaApi)
		emblaApi.on('reInit', onSelect)
		emblaApi.on('select', onSelect)
	}, [emblaApi, onSelect])

	return (
		<div className="relative overflow-hidden" ref={emblaRef}>
			<div className="backface-hidden touch-action-pan-y ml-[-1rem] flex">
				{images.map((image, index) => (
					<div
						className="relative flex w-[calc(100%)] flex-none flex-col items-center pl-[1rem]"
						key={index}
					>
						<Image
							className="block h-full w-full object-contain"
							src={getImageByIndex(index)?.image}
							alt="Your alt text"
						/>
						<p className="mx-auto w-full text-center">
							{getImageByIndex(index)?.caption}
						</p>
					</div>
				))}
			</div>
			<div className="flex w-full justify-center">
				<button
					onClick={scrollPrev}
					disabled={prevBtnDisabled}
					className="p-5 disabled:opacity-30"
				>
					<ChevronLeft size={35} />
				</button>
				<button
					onClick={scrollNext}
					disabled={nextBtnDisabled}
					className="p-5 disabled:opacity-30"
				>
					<ChevronRight size={35} className="h-full w-full" />
				</button>
			</div>
		</div>
	)
}

export default Carousel
