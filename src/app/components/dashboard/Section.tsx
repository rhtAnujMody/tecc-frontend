import React from "react";
import Course from "../Course";
import SectionHeaders from "./SectionHeaders";

export default function Section() {
  return (
    <div className="flex flex-1 flex-col">
      <SectionHeaders header="Mandatory Courses" desc="Bla Bla Bla" />
      <div className="flex gap-5 overflow-x-auto mt-3">
        {[1, 2, 3, 4, 5, 6].map((value) => (
          <>
            <div>
              <Course key={value} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
