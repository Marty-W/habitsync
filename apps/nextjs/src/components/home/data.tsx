import {
	CalendarDays,
	Cog,
	Flag,
	LineChart,
	MonitorSmartphone,
	RefreshCw,
	Repeat1,
	SunMoon,
	Tally5,
} from 'lucide-react'
import benefitTwoImg from 'public/benefit2.png'
import benefitThreeImg from 'public/benefit3.png'
import barchart from 'public/visualizations/barchart.png'
import calendar from 'public/visualizations/calendar.png'
import linechart from 'public/visualizations/linechart.png'
import streaks from 'public/visualizations/streaks.png'

import type { CarouselBenefitData, ImageBenefitData } from './benefits'

const benefitOne: CarouselBenefitData = {
	title: 'Visualize Your Habits',
	desc: 'Dive deep into your habits with powerful visualizations tailored for Todoist users. From calendar views to streaks, get insights like never before.',
	visual: 'carousel',
	images: [
		{
			image: linechart,
			caption:
				'Track your habits with a unique habit score calculated with exponential smoothing.',
		},
		{
			image: barchart,
			caption: 'See your progress over time.',
		},
		{
			image: calendar,
			caption: "Get a bird's eye view of your habits.",
		},
		{
			image: streaks,
			caption:
				'Stay motivated with the classic "don\'t break the chain" visualization.',
		},
	],
	bullets: [
		{
			title: 'Calendar View',
			desc: 'Track your habits on a daily basis with an intuitive calendar.',
			icon: CalendarDays,
		},
		{
			title: 'Habit Score',
			desc: 'Understand your consistency with a unique habit score calculated with exponential smoothing.',
			icon: LineChart,
		},
		{
			title: 'Streak View',
			desc: `Stay motivated with the classic "don't break the chain" visualization.`,
			icon: Tally5,
		},
	],
}

const benefitTwo: ImageBenefitData = {
	title: 'Seamless Todoist Integration',
	desc: 'HabitSync bridges the gap between Todoist and habit tracking. Flag projects or labels and let the magic happen.',
	visual: 'image',
	image: benefitTwoImg,
	bullets: [
		{
			title: 'Todoist Recurrence',
			desc: 'Supports all recurrence patterns that Todoist offers.',
			icon: Repeat1,
		},
		{
			title: 'Real-time Sync',
			desc: 'Your habits update in real-time as you complete tasks in Todoist.',
			icon: RefreshCw,
		},
		{
			title: 'Easy Setup',
			desc: `Flag the Todoist projects or labels you want to track, and you're set.`,
			icon: Flag,
		},
	],
}

const benefitThree: ImageBenefitData = {
	title: 'Modern & Responsive',
	desc: 'Built with cutting-edge technologies, HabitSync offers a seamless experience across devices.',
	visual: 'image',
	image: benefitThreeImg,
	bullets: [
		{
			title: 'Powered by Next.js & TailwindCSS',
			desc: 'Experience the speed and efficiency of the latest web technologies.',
			icon: Cog,
		},
		{
			title: 'Dark & Light Mode',
			desc: 'Choose your preference with zero-config light & dark mode.',
			icon: SunMoon,
		},
		{
			title: 'Fully Responsive',
			desc: 'Whether on mobile or desktop, HabitSync adapts beautifully.',
			icon: MonitorSmartphone,
		},
	],
}

export { benefitOne, benefitTwo, benefitThree }
