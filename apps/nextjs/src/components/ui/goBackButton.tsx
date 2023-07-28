import { useRouter } from "next/router"
import { ChevronLeft } from "lucide-react"

import { Button } from "./button"

interface Props {
  className?: string
  iconSize?: number
}
const GoBackButton = ({ className, iconSize = 24 }: Props) => {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => router.back()}
      className={className}
    >
      <ChevronLeft size={iconSize} />
    </Button>
  )
}

export default GoBackButton
