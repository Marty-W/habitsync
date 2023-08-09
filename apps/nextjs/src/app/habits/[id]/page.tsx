'use client'

import NextError from 'next/error'
import Link from 'next/link'
import { SiTodoist } from 'react-icons/si'

import CardWithLoader from '~/components/habitDetail/cardWithLoader'
import CompletionsGraph from '~/components/habitDetail/completionsGraph'
import DetailHeader from '~/components/habitDetail/detailHeader'
import { Button } from '~/components/ui/button'
import useHabitDetailData from '~/hooks/useHabitDetailData'

interface Props {
	params: {
		id: string
	}
	searchParams: {
		name: string
	}
}

const HabitDetail = ({ params, searchParams }: Props) => {
	// how to get these typed?
	const { id } = params
	const { name } = searchParams

	const {
		calendarData,
		description,
		streaks,
		totalCompletions,
		successRate,
		timestampSummaryCounts,
	} = useHabitDetailData(id)

	//TODO refactor this, only placeholder
	if (!timestampSummaryCounts.isSuccess) {
		return null
	}

	//TODO check wth is this
	// if (description.isError || calendarData.isError) {
	//   const statusCode =
	//     (description.error?.data?.httpStatus ?? 500) ||
	//     (calendarData.error?.data?.httpStatus ?? 500);
	//
	//   const title = description.error?.message || calendarData.error?.message;
	//
	//   return <NextError statusCode={statusCode} title={title} />;
	// }

	return (
		<div className="flex min-h-screen flex-col px-7 py-8">
			<DetailHeader title={name} />
			<div>
				<CompletionsGraph timestamps={timestampSummaryCounts.data} />
			</div>
			{/* <CardWithLoader */}
			{/*   cardType="completionGraph" */}
			{/*   lineCount={8} */}
			{/*   isLoadingSuccess={timestampSummaryCounts.isSuccess} */}
			{/*   className="mb-8" */}
			{/*   data={timestampSummaryCounts.data} */}
			{/* /> */}
			{/* <div className="grid grid-cols-2 gap-x-5"> */}
			{/*   <CardWithLoader */}
			{/*     cardType="completion" */}
			{/*     data={totalCompletions.data} */}
			{/*     isLoadingSuccess={totalCompletions.isSuccess} */}
			{/*     lineCount={3} */}
			{/*     className="mb-8" */}
			{/*   /> */}
			{/*   <CardWithLoader */}
			{/*     cardType="successRate" */}
			{/*     data={successRate.data} */}
			{/*     isLoadingSuccess={successRate.isSuccess} */}
			{/*     lineCount={3} */}
			{/*     className="mb-8" */}
			{/*   /> */}
			{/* </div> */}
			{/* <CardWithLoader */}
			{/*   data={calendarData.data} */}
			{/*   lineCount={8} */}
			{/*   cardType="calendar" */}
			{/*   isLoadingSuccess={calendarData.isSuccess} */}
			{/*   className="mb-8" */}
			{/* /> */}
			{/* <CardWithLoader */}
			{/*   data={streaks.data} */}
			{/*   lineCount={6} */}
			{/*   cardType="streak" */}
			{/*   isLoadingSuccess={streaks.isSuccess} */}
			{/*   className="mb-8" */}
			{/* /> */}
			{/* <CardWithLoader */}
			{/*   cardType="habitDescription" */}
			{/*   data={description.data} */}
			{/*   isLoadingSuccess={description.isSuccess} */}
			{/*   lineCount={4} */}
			{/*   className="mb-8" */}
			{/* /> */}
			<Button variant="link">
				<Link
					href={`${description.data?.url}`}
					target="_blank"
					className="mt-4 flex items-center justify-center"
				>
					<SiTodoist size="1rem" className="mr-1" />
					<span>Open in Todoist</span>
				</Link>
			</Button>
		</div>
	)
}

export default HabitDetail
