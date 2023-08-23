import { Suspense } from 'react'
import Link from 'next/link'
import { Video } from 'lucide-react'

import { auth } from '@habitsync/auth'

import { SignIn, SignOut } from '~/components/auth'
import Benefits from '~/components/home/benefits'
import Cta from '~/components/home/cta'
import { benefitOne, benefitThree, benefitTwo } from '~/components/home/data'
import Faq from '~/components/home/faq'
import Footer from '~/components/home/footer'
import Hero from '~/components/home/hero'
import Navbar from '~/components/home/navbar'
import SectionTitle from '~/components/home/sectionTitle'

export default function HabitSyncLandingPage() {
	return (
		<>
			<Navbar />
			<Hero />
			<SectionTitle
				pretitle="Discover HabitSync"
				title="Elevate your Todoist experience"
			>
				Not just another habit tracker. A specialized tool designed exclusively
				for Todoist enthusiasts, enhancing your productivity journey. Dive deep
				into habits, visualize progress, and master daily routines. Powered by
				Next.js & TailwindCSS, it's modern, responsive, and tailored for you.
			</SectionTitle>
			<Benefits data={benefitOne} />
			<Benefits imgPos="right" data={benefitTwo} />
			<Benefits data={benefitThree} />
			<SectionTitle
				pretitle="Watch a video"
				title="Learn how to fullfil your needs"
			>
				This section is to highlight a promo or demo video of your product.
				Analysts says a landing page with video has 3% more conversion rate. So,
				don&apos;t forget to add one. Just like this.
			</SectionTitle>
			<Video />
			<SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
				Answer your customers possible questions here, it will increase the
				conversion rate as well as support or chat requests.
			</SectionTitle>
			<Faq />
			<Cta />
			<Footer />
		</>
	)
}

export function HomePage() {
	return (
		<main className="flex h-screen flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
			<div className="container mt-12 flex flex-col items-center justify-center gap-4 px-4 py-8">
				<div className="min-h-screen">
					<h1 className="text-5xl font-bold">HabitSync</h1>
					<p>Use todoist for tracking your habits.</p>
					<p>I get it. You love todoist. You also want to track your habits.</p>
					<AuthShowcase />
					<Suspense fallback={<span>Loading...</span>}>
						<span>test</span>
					</Suspense>
				</div>
			</div>
		</main>
	)
}

export async function AuthShowcase() {
	const session = await auth()

	if (!session) {
		return (
			<SignIn
				provider="google"
				className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
			>
				Sign in with Google
			</SignIn>
		)
	}

	return (
		<>
			<Link className="btn" href="/habits?firstLoad=true">
				Go to dashboard
			</Link>

			<SignOut className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20">
				Sign out
			</SignOut>
		</>
	)
}
