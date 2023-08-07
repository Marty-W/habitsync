import { type NextPage } from "next"

import HabitList from "~/components/dashboard/habitList"
import SettingsButton from "~/components/settingsButton"
import ThemeToggle from "~/components/ui/themeToggle"
import useTimeSensitiveGreeting from "~/hooks/useTimeSensitiveGreeting"

const Habits: NextPage = () => {
  const greeting = useTimeSensitiveGreeting()

  return (
    <div className="text-primary-foreground flex min-h-screen flex-col px-7 py-6">
      <div className="mb-10 grid grid-cols-3 items-center py-7">
        <h1 className="text-accent col-start-1 text-5xl">{greeting}</h1>
        <div className="col-start-3 flex justify-end self-end">
          <ThemeToggle />
          <SettingsButton className="ml-2 justify-self-end" />
        </div>
      </div>
      <HabitList />
    </div>
  )
}

export default Habits
