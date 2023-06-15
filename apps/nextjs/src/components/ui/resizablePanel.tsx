import { PropsWithChildren } from "react"
import clsx from "clsx"
import { AnimatePresence, motion } from "framer-motion"
import useMeasure from "react-use-measure"

interface Props {
  duration: number
  slideDirection: "left" | "right" | undefined
}

const ResizableSlidePanel = ({
  children,
  duration,
  slideDirection,
}: PropsWithChildren<Props>) => {
  const [ref, { height, width }] = useMeasure()

  const variants = {
    initial: (direction: "left" | "right") => ({
      x: direction === "right" ? width : -width,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "left" ? width : -width,
      opacity: 0,
    }),
  }

  return (
    <motion.div
      animate={{ height: height || "auto" }}
      className={clsx("relative overflow-hidden")}
      transition={{ duration }}
    >
      {/* FIX it still has initial animation */}
      <AnimatePresence initial={false} custom={slideDirection}>
        <motion.div
          key={JSON.stringify(children, ignoreCircularReferences())}
          variants={variants}
          animate="animate"
          initial="initial"
          exit="exit"
          custom={slideDirection}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration },
          }}
          className={height ? "absolute w-full" : "relative w-full"}
        >
          <div ref={ref} className={`w-full`}>
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/*
  Replacer function to JSON.stringify that ignores
  circular references and internal React properties.
  https://github.com/facebook/react/issues/8669#issuecomment-531515508
*/
const ignoreCircularReferences = () => {
  const seen = new WeakSet()
  return (key: string, value: string) => {
    if (key.startsWith("_")) return // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return
      seen.add(value)
    }
    return value
  }
}

export default ResizableSlidePanel
