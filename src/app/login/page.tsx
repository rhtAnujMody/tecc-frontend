import Image from "next/image";
import React from "react";
import lady from "../../../public/landing-girl.svg";

export default function page() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <Image
        src={lady}
        alt="lady"
        fill={true}
        style={{ objectFit: "cover" }}
      ></Image>
      <div className="w-screen h-screen bg-black/20 z-10" />
      <div className="w-[500px] h-[500px] bg-[#F2F2F2]/90 z-20 absolute rounded-lg">
        Sign
      </div>
    </div>
  );
}
