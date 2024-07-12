import { TCourseHightlights } from "@/types";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import React from "react";

export default function CourseHighlightCard({
  header,
  desc,
  value,
  color = "#3498DB",
}: TCourseHightlights) {
  return (
    <div
      className={`flex flex-1 border p-7 flex-col rounded-md h-[150px]`}
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-center">
        <span className="text-text-primary font-semibold text-base ">
          {header}
        </span>
        <ArrowTopRightIcon width={20} height={20} />
      </div>
      <span className="text-4xl font-semibold mt-7" style={{ color: color }}>
        {value}
      </span>
      {/* <span className="text-text-secondary text-sm font-medium">{desc}</span> */}
    </div>
  );
}
