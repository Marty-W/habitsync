import Link from "next/link"
import { type ClassValue } from "clsx"
import { Settings } from "lucide-react"

import { cn } from "~/utils/tailwind"
import { Button } from "./ui/button"

interface Props {
  className: ClassValue
}

const SettingsButton = ({ className }: Props) => (
  <Button variant="outline" size="icon" className={cn(className)}>
    <Link href="/settings">
      <Settings size="1.2rem" />
    </Link>
  </Button>
)

export default SettingsButton
