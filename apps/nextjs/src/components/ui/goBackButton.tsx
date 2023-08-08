"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

interface Props {
  className?: string;
  iconSize?: number;
  href: string;
}
const GoBackButton = ({ className, iconSize = 24, href }: Props) => {
  return (
    <Link href={href}>
      <Button variant="ghost" size="icon" className={className}>
        <ChevronLeft size={iconSize} />
      </Button>
    </Link>
  );
};

export default GoBackButton;
