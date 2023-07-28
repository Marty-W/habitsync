import { type PropsWithChildren } from "react"
import clsx from "clsx"

const Card = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={clsx(
      "bg-card flex flex-col rounded-2xl p-5 shadow-sm",
      `${className}`,
    )}
  >
    {children}
  </div>
)

export default Card
