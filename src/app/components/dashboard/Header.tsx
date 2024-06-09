"use client";

import { useUserContext } from "@/app/context/UserContext";

import hi from "../../../../public/hi.svg";
import credit from "../../../../public/credit.svg";
import Image from "next/image";

export default function Header() {
  const { user: userData } = useUserContext();
  return (
    <div className="top-0 sticky z-50 h-[80px] flex w-full py-7 px-5 justify-between items-center">
      <div className="flex gap-2 items-center">
        <span className="text-2xl text-text-primary font-semibold">{`Welcome, ${userData?.first_name}`}</span>
        <Image src={hi} alt="hi" width={25} height={25}></Image>
      </div>
      <div>
        <div className="py-2 px-3 flex border border-[#FFA800] gap-3 rounded-md">
          <Image src={credit} alt="credit" width={15} height={15} />
          <span className="text-text-primary">{userData?.credits}</span>
        </div>
      </div>
    </div>
  );
}
