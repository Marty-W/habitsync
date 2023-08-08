"use client";

import { api } from "~/utils/trpc";
import FetchError from "../ui/fetchError";
import Spinner from "../ui/spinner";
import DashboardHabit from "./dashboardHabit";

const HabitList = () => {
  const allHabits = api.habit.getAll.useQuery(undefined, { retry: 0 });

  //TODO  add loading state
  //TODO check error state

  if (allHabits.isLoading) {
    return (
      <div>
        <Spinner />
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
