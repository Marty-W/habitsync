import { RotateCw } from "lucide-react"

import { cn } from "~/utils/tailwind"

interface Props {
  className?: string
  refetch: () => Promise<any>
  isRefetching: boolean
  children: React.ReactNode
}
const FetchError = ({ className, refetch, isRefetching, children }: Props) => {
  const handleRedoClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await refetch()
  }

  return (
    <div className={cn("text-muted-foreground flex justify-center", className)}>
      <button onClick={handleRedoClick}>
        <RotateCw className={`mr-3 ${isRefetching ? "animate-spin" : ""}`} />
      </button>
      {children}
    </div>
  )
}

export default FetchError
