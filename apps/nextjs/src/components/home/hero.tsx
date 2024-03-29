import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { auth } from '@habitsync/auth'

import heroImg from '../../../public/hero.png'
import { SignIn } from '../auth'
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
							<Suspense fallback={<span>...</span>}>
								<HeroAuth />
							</Suspense>
						</div>
					</div>
				</div>
				<div className="flex w-full items-center justify-center lg:w-1/2">
					<Image
						src={heroImg}
						className={'object-cover'}
						alt="Hero Illustration"
						loading="eager"
						placeholder="blur"
					/>
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

const HeroAuth = async () => {
	const session = await auth()

	if (session) {
		return (
			<Button size="xl" asChild>
				<Link className="btn" href="/habits?firstLoad=true">
					Go to dashboard
				</Link>
			</Button>
		)
	}
	return (
		<>
			<Button size="xl" asChild>
				<SignIn provider="todoist">Sign up with Todoist</SignIn>
			</Button>
		</>
	)
}

export default Hero
