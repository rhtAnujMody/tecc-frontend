import React from "react";

export default function TotalLectures({ lectures }: { lectures: string }) {
  return (
    <div className="flex py-1 px-3 bg-white text-primary rounded-md shadow text-xs">
      {lectures}
    </div>
  );
}
