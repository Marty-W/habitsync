import Link from "next/link"
import { CircleSlash } from "lucide-react"

import { Button } from "../ui/button"
import { type SyncSourceType } from "./syncList"
import SyncRecap from "./syncRecap"

interface Props {
  sourceType: SyncSourceType
}

const SyncEmpty = ({ sourceType }: Props) => {
  const otherSyncType = sourceType === "project" ? "label" : "project"
  return (
    <SyncRecap
      icon={<CircleSlash size={50} className="text-primary" />}
      text="There are no new tasks to sync."
    >
      <Button variant="link">
        <Link href={`/settings/sync-new-habits/${otherSyncType}s`}>
          Sync by {otherSyncType}s
        </Link>
      </Button>
      <Button>
        <Link href="/habits">Go to dashboard</Link>
      </Button>
    </SyncRecap>
  )
}

export default SyncEmpty
