import { LinkBreak2Icon } from "@radix-ui/react-icons";
import React from "react";

export default function Error() {
  return (
    <div className="flex flex-1 items-center justify-center flex-col gap-5">
      <LinkBreak2Icon width={100} height={100}></LinkBreak2Icon>
      <span className="text-text-secondary font-semibold text-2xl">
        Something Went Wrong
      </span>
    </div>
  );
}
