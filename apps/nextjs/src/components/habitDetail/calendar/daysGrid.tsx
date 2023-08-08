import { isToday } from "date-fns";

import { normalizeDate } from "@habitsync/lib";

import ResizableSlidePanel from "~/components/ui/resizablePanel";
import useCalendar from "~/hooks/useCalendar";
import { AnimationDirection } from "./calendar";
import DayCell from "./dayCell";

interface Props {
  animationDirection: AnimationDirection;
}

const DaysGrid = ({ animationDirection }: Props) => {
  return (
    <ResizableSlidePanel duration={0.5} slideDirection={animationDirection}>
      <div className="grid flex-1 grid-cols-7 place-items-center gap-x-1 gap-y-4">
        {calendarData?.length &&
          calendarData.map((dateStr, i) => {
            const date = new Date(dateStr);
            return (
              <DayCell
                date={date.getDate()}
                isThisMonth={month === date.getMonth()}
                hasTimestamp={timestamps.has(normalizeDate(date))}
                isToday={isToday(date)}
                key={i}
                isExtraStreakDay={
                  (extraStreakDays &&
                    extraStreakDays.has(normalizeDate(date))) ||
                  false
                }
              />
            );
          })}
      </div>
    </ResizableSlidePanel>
  );
};
