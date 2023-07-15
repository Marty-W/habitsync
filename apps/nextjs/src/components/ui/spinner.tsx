import { RotateCw } from "lucide-react"

import { cn } from "~/utils/tailwind"

interface Props {
  isActive: boolean
  className?: string
}

const Spinner = ({ isActive, className }: Props) => {
  return <RotateCw className={cn(className, isActive && "animate-spin")} />
}

export default Spinner
