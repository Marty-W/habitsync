import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { type EditHabitType } from "~/pages/settings/edit-habits";
import { Button } from "../ui/button";
import Recap from "./recap";

interface Props {
  numOfMutations: number;
  handleEditMore: () => void;
  type: EditHabitType;
}

const getEditTypeText = (type: EditHabitType, numOfMutations: number) => {
  if (type === "delete-habits") {
    return `Congratulations, you've deleted ${numOfMutations} habit${
      numOfMutations > 1 ? "s" : ""
    }.`;
  }
  return `Congratulations, you've deleted ${numOfMutations} timestamp${
    numOfMutations > 1 ? "s" : ""
  }.`;
};

const EditSuccess = ({ numOfMutations, handleEditMore, type }: Props) => {
  const text = getEditTypeText(type, numOfMutations);

  return (
    <Recap icon={<BadgeCheck size={50} className="text-success" />} text={text}>
      <Button size="sm" onClick={handleEditMore} variant="link">
        Edit more
      </Button>
      <Button>
        <Link href="/habits">Go to dashboard</Link>
      </Button>
    </Recap>
  );
};

export default EditSuccess;
