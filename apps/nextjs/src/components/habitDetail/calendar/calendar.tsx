import { useState } from "react";

import { normalizeDate } from "@habitsync/lib";

import { type RouterOutputs } from "~/utils/trpc";
import Loader from "~/components/ui/activeLoader";
import ResizableSlidePanel from "~/components/ui/resizablePanel";
import useCalendarData from "~/hooks/useCalendar";
import DayCell from "./dayCell";
import MonthSwitcher from "./monthSwitcher";
import WeekRow from "./weekRow";

interface Props {
  data: RouterOutputs["timestamp"]["getAllWithStreakDays"];
}

export type AnimationDirection = "left" | "right" | null;

const Calendar = ({ data }: Props) => {
  const { year, month, calendarData, handleAddMonth, handleSubMonth } =
    useCalendarData();
  const [animationDirection, setAnimationDirection] =
    useState<AnimationDirection>(null);
  const { extraStreakDays, timestamps } = data;

  const handleMonthChange = (type: "addMonth" | "subMonth") => {
    if (type === "addMonth") {
      setAnimationDirection("right");
      handleAddMonth();
    } else {
      setAnimationDirection("left");
      handleSubMonth();
    }
  };

  if (!calendarData) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col">
      <MonthSwitcher
        month={month}
        year={year}
        handleMonthChange={handleMonthChange}
      />
      <WeekRow />
      <ResizableSlidePanel duration={0.5} slideDirection={animationDirection}>
        <div className="grid flex-1 grid-cols-7 place-items-center gap-y-4">
          {calendarData.map((dateStr, i) => {
            const date = new Date(dateStr);
            const isThisMonth = month === date.getMonth();
            const isSuccessfull = timestamps.has(normalizeDate(date));
            const isExtraStreakDay = extraStreakDays?.has(normalizeDate(date));
            const isToday = normalizeDate(date) === normalizeDate(new Date());
            const isTodayWithTimestamp = isToday && isSuccessfull;

            // Outside this month
            if (!isThisMonth) {
              if (isSuccessfull) {
                return (
                  <DayCell
                    date={date}
                    key={i}
                    variant="notThisMonthWithTimestamp"
                  />
                );
              }
              return <DayCell date={date} key={i} variant="notThisMonth" />;
            }

            if (isTodayWithTimestamp) {
              return (
                <DayCell date={date} key={i} variant="todayWithTimestamp" />
              );
            }

            if (isToday) {
              return <DayCell date={date} key={i} variant="today" />;
            }

            if (isSuccessfull) {
              return <DayCell date={date} key={i} variant="withTimestamp" />;
            }

            if (isExtraStreakDay) {
              return <DayCell date={date} key={i} variant="extraStreakDay" />;
            }

            return <DayCell date={date} key={i} />;
          })}
        </div>
      </ResizableSlidePanel>
    </div>
  );
};

export default Calendar;
