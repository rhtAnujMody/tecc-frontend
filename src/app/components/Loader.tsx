import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

export default function Loader({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ReloadIcon
      className={cn("mr-2  animate-spin", className)}
      style={{ width: 30, height: 30 }}
    />
  );
}
