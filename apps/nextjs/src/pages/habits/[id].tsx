import NextError from "next/error"
import Link from "next/link"
import { useRouter } from "next/router"
import { SiTodoist } from "react-icons/si"

import { api } from "~/utils/trpc"
import { BackButton } from "~/components/backButton"
import CardWithLoader from "~/components/habitDetail/cardWithLoader"
import SettingsButton from "~/components/settingsButton"
import GoBackButton from "~/components/ui/goBackButton"

const HabitDetail = () => {
  const id = useRouter().query.id as string
  const name = useRouter().query.name as string
  const calendarData = api.timestamp.getAllWithStreakDays.useQuery({
    habitId: id,
  })
  const description = api.habit.getDetail.useQuery({
    id: id,
  })

  const streaks = api.streak.getBest.useQuery({ habitId: id, numStreaks: 5 })
  const totalCompletions = api.stats.getTotalHabitCompletions.useQuery({
    habitId: id,
  })

  const successRate = api.stats.getHabitSuccessRate.useQuery({
    habitId: id,
  })

  const timestampSummaryCounts = api.timestamp.getSummaryCounts.useQuery({
    habitId: id,
  })

  if (description.isError || calendarData.isError) {
    const statusCode =
      (description.error?.data?.httpStatus ?? 500) ||
      (calendarData.error?.data?.httpStatus ?? 500)

    const title = description.error?.message || calendarData.error?.message

    return <NextError statusCode={statusCode} title={title} />
  }

  return (
    <div className="flex min-h-screen flex-col px-7 py-8">
      <div className="mb-8 grid grid-cols-[0.2fr_1fr_0.2fr] place-items-center">
        <GoBackButton href="/habits" />
        <h1 className="text-foreground text-2xl">{name}</h1>
        <div className="flex items-center justify-end">
          <SettingsButton />
        </div>
      </div>
      <CardWithLoader
        cardType="habitDescription"
        data={description.data}
        isLoadingSuccess={description.isSuccess}
        lineCount={4}
        className="mb-8"
      />
      <CardWithLoader
        cardType="completionGraph"
        lineCount={8}
        isLoadingSuccess={timestampSummaryCounts.isSuccess}
        className="mb-8"
        data={timestampSummaryCounts.data}
      />
      <div className="grid grid-cols-2 gap-x-5">
        <CardWithLoader
          cardType="completion"
          data={totalCompletions.data}
          isLoadingSuccess={totalCompletions.isSuccess}
          lineCount={3}
          className="mb-8"
        />
        <CardWithLoader
          cardType="successRate"
          data={successRate.data}
          isLoadingSuccess={successRate.isSuccess}
          lineCount={3}
          className="mb-8"
        />
      </div>
      <CardWithLoader
        data={calendarData.data}
        lineCount={8}
        cardType="calendar"
        isLoadingSuccess={calendarData.isSuccess}
        className="mb-8"
      />
      <CardWithLoader
        data={streaks.data}
        lineCount={6}
        cardType="streak"
        isLoadingSuccess={streaks.isSuccess}
        className="mb-8"
      />
      <Link
        href={`${description.data?.url}`}
        target="_blank"
        className="mt-4 flex items-center justify-center hover:text-zinc-400"
      >
        <SiTodoist size="1rem" className="mr-1" />
        <span>Open in Todoist</span>
      </Link>
    </div>
  )
}

export default HabitDetail
