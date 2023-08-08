import { format } from "date-fns";
import { motion } from "framer-motion";

import { type RouterOutputs } from "~/utils/trpc";

interface Props {
  streaks: RouterOutputs["streak"]["getBest"];
}

const Streaks = ({ streaks }: Props) => {
  return (
    <div className="text-center">
      <h1 className="text-muted-foreground text-lg">Your best streaks</h1>
      <div className="">
        {streaks.map((streak, index, arr) => {
          const timeFormat = "MMM d";
          const formattedStart = format(new Date(streak.start), timeFormat);
          const formattedEnd = format(new Date(streak.end), timeFormat);

          // I presume that the first streak is the longest one
          const maxStreak = arr[0].length;

          const barWidth = (streak.length / maxStreak) * 100;
          return (
            <div
              key={`${index}-${barWidth}`}
              className="my-4 grid h-8 grid-flow-row grid-cols-[70px_1fr_70px] items-center"
            >
              <span className="text-muted-foreground text-sm">
                {formattedStart}
              </span>
              <div
                className={`relative flex h-6 w-full items-center justify-center justify-self-center rounded-xl shadow-inner`}
              >
                <motion.div
                  style={{ minWidth: "30px", height: "25px" }}
                  className="bg-accent flex items-center justify-center rounded-xl"
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ duration: 4 }}
                >
                  <span className="text-foreground text-lg">
                    {streak.length}
                  </span>
                </motion.div>
                {index === 0 && (
                  <span className="absolute right-2 text-xs">days</span>
                )}
              </div>
              <span className="text-muted-foreground text-sm">
                {formattedEnd}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Streaks;
