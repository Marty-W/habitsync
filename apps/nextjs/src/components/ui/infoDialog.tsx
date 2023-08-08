import { Info } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface Props {
  iconSize?: number;
  header: string;
  text: string;
}

const InfoDialog = ({ iconSize = 18, header, text }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="text-muted-foreground">
        <Info size={iconSize} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InfoDialog;
