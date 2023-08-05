import { Loader2 } from "lucide-react"

import { cn } from "~/utils/tailwind"

interface Props {
  size?: number
  className?: string
}

const Loader = ({ size = 55, className }: Props) => (
  <Loader2 className={cn("animate-spin", className)} size={size} />
)

export default Loader
