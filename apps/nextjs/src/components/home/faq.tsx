'use client'

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUp } from 'lucide-react'

import Container from './container'

const Faq = () => {
	return (
		<Container className="!p-0">
			<div className="mx-auto w-full max-w-2xl rounded-2xl p-2">
				{faqdata.map((item) => (
					<div key={item.question} className="mb-5">
						<Disclosure>
							{({ open }) => (
								<>
									<Disclosure.Button className="dark:bg-trueGray-800 flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-4 text-left text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:text-gray-200">
										<span>{item.question}</span>
										<ChevronUp
											className={`${
												open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-indigo-500`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="px-4 pb-2 pt-4 text-gray-500 dark:text-gray-300">
										{item.answer}
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					</div>
				))}
			</div>
		</Container>
	)
}

const faqdata = [
	{
		question: 'How do I integrate HabitSync with my Todoist account?',
		answer: `Integrating HabitSync with Todoist is simple. Once you sign up, you'll be prompted to connect your Todoist account. Just follow the on-screen instructions, and you'll be set up in no time.`,
	},
	{
		question: 'How does HabitSync track my habits from Todoist tasks?',
		answer:
			'Once you flag specific projects or labels for tracking in HabitSync, every time you complete a task under them in Todoist, our system records a timestamp. This data is then used to provide you with detailed habit analytics.',
	},
	{
		question: 'Can I use HabitSync on my mobile device?',
		answer:
			'Yes, HabitSync is fully responsive and optimized for both desktop and mobile devices. You can track and visualize your habits on the go.',
	},
	{
		question: 'Do you support task managers other than Todoist?',
		answer:
			"Currently, HabitSync is exclusively designed for Todoist users. However, we're always looking to expand and might support other task managers in the future.",
	},
	{
		question: 'How much does HabitSync cost?',
		answer:
			"HabitSync is currently in its alpha phase, and all features are available for free. We're continuously working to improve and expand the platform. Any potential changes to our pricing will be communicated in advance, but for now, enjoy everything HabitSync has to offer at no cost!",
	},
]

export default Faq
