import { cn } from "~/utils/tailwind";
import { RotateCw } from "lucide-react";

interface Props {
  isActive: boolean;
  className?: string;
}

const ClickSpinner = ({ isActive, className }: Props) => {
  return <RotateCw className={cn(className, isActive && "animate-spin")} />;
};

export default ClickSpinner;
