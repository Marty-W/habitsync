import { format } from "date-fns";

import Pill from "../ui/pill";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  date: Date;
  isSuccessful: boolean;
  isExtraStreakDay?: boolean;
  isBeforeHabitStarted: boolean;
}

const DayCompletionStatus = ({
  date,
  isSuccessful,
  isExtraStreakDay,
  isBeforeHabitStarted,
}: Props) => {
  const variant = isBeforeHabitStarted
    ? "blank"
    : isSuccessful
    ? "success"
    : isExtraStreakDay
    ? "void"
    : "failure";

  const tooltipContent = (
    <div className="flex flex-col items-center">
      <span className="mb-1">
        {isSuccessful
          ? "Successful day!"
          : isExtraStreakDay
          ? "Extra streak day!"
          : isBeforeHabitStarted
          ? "Habit not started yet"
          : "Failure day"}
      </span>
      <span>{format(date, "iiii MMM e")}</span>
    </div>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <Pill variant={variant} />
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DayCompletionStatus;
