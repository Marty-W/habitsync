import clsx from 'clsx'
import { PropsWithChildren } from 'react'

const Card = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => (
  <div
    className={clsx(
      'flex flex-col rounded-xl bg-slate-100 p-5 shadow-sm',
      `${className}`
    )}
  >
    {children}
  </div>
)

export default Card
