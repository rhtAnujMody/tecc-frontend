"use client";
import { useUserContext } from "@/app/context/UserContext";
import { capitializeFirstChar } from "@/lib/utils";
import Image from "next/image";
import credit from "../../../../public/credit.svg";

export default function Header() {
  const { user: userData } = useUserContext();
  return (
    <div className="top-0 sticky z-50 h-[80px] flex w-full py-7 px-5 justify-between items-center border-b">
      <div className="flex gap-2 items-center">
        <span className="text-2xl text-text-primary font-semibold">{`Welcome, ${capitializeFirstChar(
          userData?.first_name ?? ""
        )}`}</span>
        {/* <Image
          src={hi}
          alt="hi"
          width={25}
          height={25}
          className="w-auto h-auto"
        ></Image> */}
      </div>
      <div>
        <div className="py-2 px-3 flex border border-[#FFA800] gap-3 rounded-md">
          <Image
            src={credit}
            alt="credit"
            width={0}
            height={0}
            className="w-auto h-auto"
          />
          <span className="text-text-primary">{userData?.credit ?? 0}</span>
        </div>
      </div>
    </div>
  );
}
