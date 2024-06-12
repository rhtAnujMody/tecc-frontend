import { ReloadIcon } from "@radix-ui/react-icons";
import React from "react";

export default function Loader() {
  return (
    <ReloadIcon
      className="mr-2  animate-spin"
      style={{ width: 30, height: 30 }}
    />
  );
}
