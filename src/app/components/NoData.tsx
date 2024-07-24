import React from "react";

export default function NoData({ errMessage }: { errMessage?: string }) {
  return (
    <div className="flex flex-1 justify-center items-center text-lg text-text-primary font-semibold">
      {errMessage ? errMessage : "No data found"}
    </div>
  );
}
