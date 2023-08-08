import { AlertCircle } from "lucide-react";

interface Props {
  errorMessage: string;
  kind?: "error" | "empty";
}

const WorkflowError = ({ errorMessage, kind }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <AlertCircle size={40} className="text-muted-foreground mb-3" />
      <div className="mx-5 text-center">
        <span className="text-muted-foreground text-sm">{errorMessage}</span>
      </div>
    </div>
  );
};

export default WorkflowError;
