"use client";

import { api } from "~/utils/trpc";
import FetchError from "../ui/fetchError";
import Spinner from "../ui/spinner";
import DashboardHabit from "./dashboardHabit";

const HabitList = () => {
  const allHabits = api.habit.getAll.useQuery(undefined, { retry: 0 });

  if (allHabits.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center text-muted-foreground/40">
        <span className="my-3 text-xl">Getting your habits...</span>
        <Spinner size={90} />
      </div>
    );
  }

  if (allHabits.isError)
    return (
      <FetchError
        isRefetching={allHabits.isRefetching}
        refetch={allHabits.refetch}
      >
        <span>{allHabits.error.message}</span>
      </FetchError>
    );

  return (
    <div className="flex flex-col">
      {allHabits.data.map((habit) => {
        return <DashboardHabit key={habit.id} habit={habit} />;
      })}
    </div>
  );
};

export default HabitList;
