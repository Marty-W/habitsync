import { cn } from "~/utils/tailwind";
import { ChevronRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ElementType } from "react";

const ButtonDefaultAsType = "button";
type ButtonDefaultAsType = typeof ButtonDefaultAsType;

type ItemOwnProps<E extends ElementType> = {
  as?: E;
  title: string;
  className?: string;
  children?: React.ReactNode;
};

type ItemProps<E extends ElementType> = ItemOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof ItemOwnProps<E>>;

const SettingsItem = <E extends ElementType = ButtonDefaultAsType>({
  as,
  title,
  className,
  children,
  ...delegated
}: ItemProps<E>) => {
  const Tag = as || ButtonDefaultAsType;

  return (
    <div className="p-3">
      <Tag
        {...delegated}
        className={cn("flex w-full items-center justify-between", className)}
      >
        <span>{title}</span>
        {as !== "button" && <ChevronRight size={20} />}
        {children}
      </Tag>
    </div>
  );
};

export default SettingsItem;
