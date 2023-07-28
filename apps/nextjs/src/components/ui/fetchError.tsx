import { cn } from "~/utils/tailwind"
import Spinner from "./spinner"

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
    <div
      className={cn(
        "text-muted-foreground flex flex-col items-center justify-center",
        className,
      )}
    >
      <button onClick={handleRedoClick} className="mb-3">
        <Spinner isActive={isRefetching} className="h-8 w-8" />
      </button>
      {children}
    </div>
  )
}

export default FetchError
