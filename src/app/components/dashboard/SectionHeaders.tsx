import { TSectionHeader } from "@/types";
import React from "react";

export default function SectionHeaders({ header, desc }: TSectionHeader) {
  return (
    <div className="flex flex-1 flex-col ">
      <span className="text-text-primary text-xl font-semibold">{header}</span>
      <span className="text-text-primary text-xs font-normal">{desc}</span>
    </div>
  );
}
