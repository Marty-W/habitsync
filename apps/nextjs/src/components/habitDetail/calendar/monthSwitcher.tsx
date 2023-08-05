import { MONTHS } from "@habitsync/lib"
import { motion } from "framer-motion"
import { GoChevronLeft, GoChevronRight } from "react-icons/go"

interface Props {
  month: number
  year: number
  handleMonthChange: (op: "addMonth" | "subMonth") => void
}

const MonthSwitcher = ({ month, year, handleMonthChange }: Props) => {
  return (
    <div className="mb-5 flex items-center justify-between px-6 text-lg">
      <motion.button whileTap={{ scale: 0.85 }}>
        <GoChevronLeft
          onClick={() => handleMonthChange("subMonth")}
          className="rounded-full"
          size="1em"
        />
      </motion.button>
      <div className="px-4 text-xl">
        <span className="text-foreground mr-1 font-bold">{MONTHS[month]}</span>
        <span className="text-muted-foreground/30">{year}</span>
      </div>
      <motion.button whileTap={{ scale: 0.85 }}>
        <GoChevronRight
          className="rounded-full"
          onClick={() => handleMonthChange("addMonth")}
          size="1em"
        />
      </motion.button>
    </div>
  )
}

export default MonthSwitcher
