import router from "next/router"
import { ChevronLeft } from "lucide-react"

import { Button } from "./button"

interface Props {
  href: string
  className?: string
  iconSize?: number
}
const GoBackButton = ({ href, className, iconSize = 24 }: Props) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.push(href)}
      className={className}
    >
      <ChevronLeft size={iconSize} />
    </Button>
  )
}

export default GoBackButton
