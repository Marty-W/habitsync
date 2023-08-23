import Image from 'next/image'

import heroImg from '../../../public/hero.png'
import { Button } from '../ui/button'
import Container from './container'

const Hero = () => {
	return (
		<>
			<Container className="flex flex-wrap ">
				<div className="flex w-full items-center lg:w-1/2">
					<div className="mb-8 max-w-2xl">
						<h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
							Wish Todoist had habit analytics?
						</h1>
						<p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl">
							Unlock the potential of your Todoist tasks with HabitSync. Dive
							into habit analytics, streaks, and visualizations like never
							before.
						</p>

						<div className="flex flex-col items-start space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
							<Button size="xl">Sign up</Button>
							<Button variant="link">Demo account</Button>
						</div>
					</div>
				</div>
				<div className="flex w-full items-center justify-center lg:w-1/2">
					<div className="">
						<Image
							src={heroImg}
							width="616"
							height="617"
							className={'object-cover'}
							alt="Hero Illustration"
							loading="eager"
							placeholder="blur"
						/>
					</div>
				</div>
			</Container>
			<Container>
				<div className="flex flex-col justify-center">
					<p className="mt-4 text-center text-lg text-gray-500">
						Bridging the gap between Todoist and habit tracking, HabitSync was
						born out of a passion to help Todoist users visualize and master
						their habits. Join us on this journey.
					</p>
				</div>
			</Container>
		</>
	)
}

export default Hero
