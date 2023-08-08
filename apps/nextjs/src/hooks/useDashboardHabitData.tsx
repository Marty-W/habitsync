import { api } from "~/utils/trpc";

const useDashboardHabitData = () => {
  const allHabits = api.habit.getAll.useQuery(undefined, { retry: 0 });
};

export default useDashboardHabitData;
