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
		question: 'Is this template completely free to use?',
		answer: 'Yes, this template is completely free to use.',
	},
	{
		question: 'Can I use it in a commercial project?',
		answer: 'Yes, this you can.',
	},
	{
		question: 'What is your refund policy? ',
		answer:
			"If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
	},
	{
		question: 'Do you offer technical support? ',
		answer:
			"No, we don't offer technical support for free downloads. Please purchase a support plan to get 6 months of support.",
	},
]

export default Faq
