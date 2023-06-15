import type { RouterOutputs } from "@habitsync/api";
import {
  type CalendarData,
  type HabitDescriptionData,
  type StreakData,
} from "@habitsync/lib";

import Calendar from "~/components/habitDetail/calendar/calendar";
import TotalCompletions from "~/components/habitDetail/completions";
import HabitDescription from "~/components/habitDetail/habitDescription";
import Streaks from "~/components/habitDetail/streaks";
import Card from "~/components/ui/card";
import CardSkeleton from "~/components/ui/cardSkeleton";
import CompletionsGraph from "./completionsGraph";
import SuccessRate from "./successRate";

//FIX right now these are anys, use RouterOutputs straight from utils in this pckg

interface BaseProps {
  className?: string;
  lineCount: number;
  isLoadingSuccess: boolean;
  mock?: boolean;
}

interface CalendarProps extends BaseProps {
  cardType: "calendar";
  data: CalendarData;
}

interface HabitDescriptionProps extends BaseProps {
  cardType: "habitDescription";
  data: HabitDescriptionData;
}

interface StreakProps extends BaseProps {
  cardType: "streak";
  data: StreakData;
}

interface CompletionProps extends BaseProps {
  cardType: "completion";
  data: number | undefined;
}

interface SuccessRateProps extends BaseProps {
  cardType: "successRate";
  data: string | undefined;
}

interface CompletionGraphProps extends BaseProps {
  cardType: "completionGraph";
  data: RouterOutputs["timestamp"]["getSummaryCounts"] | undefined;
}

type Props =
  | CalendarProps
  | HabitDescriptionProps
  | StreakProps
  | CompletionProps
  | SuccessRateProps
  | CompletionGraphProps;

const CardWithLoader = ({
  className,
  lineCount,
  isLoadingSuccess,
  data,
  cardType,
  mock,
}: Props) => {
  // FIX weird, refactor
  if (!isLoadingSuccess || !data || mock) {
    return <CardSkeleton cardClassName={className} count={lineCount} />;
  }

  let content;

  switch (cardType) {
    case "calendar":
      content = <Calendar data={data} />;
      break;
    case "habitDescription":
      content = <HabitDescription desc={data} />;
      break;
    case "streak":
      content = <Streaks streaks={data} />;
      break;
    case "completion":
      content = <TotalCompletions completions={data} />;
      break;
    case "successRate":
      content = <SuccessRate rate={data} />;
      break;
    case "completionGraph":
      content = <CompletionsGraph timestamps={data} />;
  }

  return <Card className={className}>{content}</Card>;
};

export default CardWithLoader;
