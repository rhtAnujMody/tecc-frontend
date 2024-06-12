import { TCourseHightlights } from "@/types";
import React from "react";

export default function CourseHighlightCard({
  header,
  desc,
  value,
  color = "#3498DB",
}: TCourseHightlights) {
  return (
    <div
      className={`flex flex-1 border p-7 flex-col rounded-md min-h-[150px] justify-between`}
      style={{ borderColor: color }}
    >
      <span className="text-text-primary font-semibold text-base">
        {header}
      </span>
      <span className="text-4xl font-semibold" style={{ color: color }}>
        {value}
      </span>
      {/* <span className="text-text-secondary text-sm font-medium">{desc}</span> */}
    </div>
  );
}
