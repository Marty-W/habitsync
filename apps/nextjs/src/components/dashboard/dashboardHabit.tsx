import type {RouterOutputs} from "~/utils/trpc";
import Link from "next/link";
import CompletionsRow from "./completionsRow";

interface Props {
  habit: RouterOutputs["habit"]["getAll"][0];
}

const DashboardHabit = ({ habit }: Props) => {
  const { id, name } = habit;

  return (
    <Link href={`/habits/${id}?name=${name}`}>
      <div className="bg-card hover:bg-accent/30 text-card-foreground my-2 flex items-center justify-between rounded-xl p-5">
        <span className="flex-1">{name}</span>
        <CompletionsRow habitId={id} />
      </div>
    </Link>
  );
};

export default DashboardHabit;
