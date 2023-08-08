import { Skeleton } from "./loadingSkeleton";

interface Props {
  count?: number;
}

const HabitLoadingSkeleton = ({ count }: Props) => {
  const content = Array.from(Array(count).keys()).map((i) => (
    <div key={i} className="my-3 flex flex-col space-y-2">
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  ));
  return content;
};

export default HabitLoadingSkeleton;
