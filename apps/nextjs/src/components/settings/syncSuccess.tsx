import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { Button } from "../ui/button";
import Recap from "./recap";
import { type SyncSourceType } from "./syncList";

interface Props {
  numOfHabitsCreated: number;
  sourceType: SyncSourceType;
  handleSyncAgain: () => void;
}

const SyncSuccess = ({
  numOfHabitsCreated,
  sourceType,
  handleSyncAgain,
}: Props) => {
  const otherSyncType = sourceType === "project" ? "label" : "project";
  const text = `Congratulations. You've synced ${numOfHabitsCreated} habit${
    numOfHabitsCreated > 1 ? "s" : ""
  }.`;
  return (
    <Recap icon={<BadgeCheck size={50} className="text-success" />} text={text}>
      <Button variant="link">
        <Link href={`/settings/sync-new-habits/${otherSyncType}s`}>
          Sync by {otherSyncType}s{" "}
        </Link>
      </Button>
      <Button size="sm" onClick={handleSyncAgain} variant="link">
        Sync again
      </Button>
      <Button>
        <Link href="/habits">Go to dashboard</Link>
      </Button>
    </Recap>
  );
};

export default SyncSuccess;
