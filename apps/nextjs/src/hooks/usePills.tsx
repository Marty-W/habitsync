import { useEffect, useState } from "react";
import useMeasure from "react-use-measure";

import { getPastDays } from "@habitsync/lib";

const PILL_WIDTH = 10;

const usePills = () => {
  const [ref, rect] = useMeasure();
  const [numPills, setNumPills] = useState<number>(0);
  const [daysToDisplay] = useState<Date[]>(() => {
    return getPastDays(30);
  });

  useEffect(() => {
    const { width } = rect;

    setNumPills(Math.floor(width / 2 / PILL_WIDTH));
  }, [rect]);

  return {
    pills: daysToDisplay.slice(0, numPills),
    ref,
  };
};

export default usePills;
