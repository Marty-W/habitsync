import { format } from "date-fns";
import Pill from "../ui/pill";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

type PillInput = Omit<Props, "date">;

const getPillVariant = (variant: PillInput) => {
  switch (true) {
    case variant.isBlank:
      return "blank";
    case variant.isSuccessful:
      return "success";
    case variant.isExtraStreakDay:
      return "void";
    default:
      return "failure";
  }
};

const getTooltipContent = (variant: PillInput) => {
  switch (true) {
    case variant.isBlank:
      return "Habit not started yet";
    case variant.isSuccessful:
      return "Successful day!";
    case variant.isExtraStreakDay:
      return "Extra streak day!";
    default:
      return "Failure day";
  }
};

interface Props {
  date: Date;
  isSuccessful: boolean;
  isExtraStreakDay?: boolean;
  isBlank: boolean;
}

const DayCompletionStatus = ({
  date,
  isSuccessful,
  isExtraStreakDay,
  isBlank,
}: Props) => {
  const variant = getPillVariant({ isSuccessful, isExtraStreakDay, isBlank });

  const tooltipContent = (
    <div className="flex flex-col items-center">
      <span className="mb-1">
        {getTooltipContent({ isSuccessful, isExtraStreakDay, isBlank })}
      </span>
      <span>{format(date, "iiii MMM e")}</span>
    </div>
  );

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger>
          <div className="animate-fade-in">
            <Pill variant={variant} />
          </div>
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DayCompletionStatus;
