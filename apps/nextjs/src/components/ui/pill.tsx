import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/utils/tailwind"

const pillVariants = cva("mx-1 h-8 w-[10px] rounded-lg", {
  variants: {
    variant: {
      success: "bg-success",
      void: "bg-void",
      failure: "bg-destructive",
      blank: "bg-muted border",
    },
  },
})

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pillVariants> {}

const Pill = ({ variant, className }: Props) => {
  return <div className={cn(pillVariants({ variant, className }))} />
}

export default Pill
