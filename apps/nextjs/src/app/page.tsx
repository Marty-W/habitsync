import Benefits from '~/components/home/benefits'
import Cta from '~/components/home/cta'
import { benefitOne, benefitThree, benefitTwo } from '~/components/home/data'
import Faq from '~/components/home/faq'
import Footer from '~/components/home/footer'
import Hero from '~/components/home/hero'
import Navbar from '~/components/home/navbar'
import SectionTitle from '~/components/home/sectionTitle'

const HabitSyncLandingPage = () => {
	return (
		<>
			<Navbar />
			<Hero />
			<SectionTitle
				pretitle="Discover HabitSync"
				title="Elevate your Todoist experience"
				id="features"
			>
				Not just another habit tracker. A specialized tool designed exclusively
				for Todoist enthusiasts, enhancing your productivity journey. Dive deep
				into habits, visualize progress, and master daily routines. Powered by
				Next.js & TailwindCSS, it&apos;s modern, responsive, and tailored for
				you.
			</SectionTitle>
			<Benefits data={benefitOne} />
			<Benefits imgPos="right" data={benefitTwo} />
			<Benefits data={benefitThree} />
			<SectionTitle pretitle="FAQ" title="Frequently Asked Questions" id="faq">
				Your questions matter to us. We&apos;ve compiled answers to some of the
				most common queries about HabitSync. If you have additional questions,
				don&apos;t hesitate to reach out. We&apos;re here to ensure you have a
				seamless experience.
			</SectionTitle>
			<Faq />
			<Cta />
			<Footer />
		</>
	)
}

export default HabitSyncLandingPage
