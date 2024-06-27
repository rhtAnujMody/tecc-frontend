import { TDashBoardBanner } from "@/types";
import Image from "next/image";
import Stars from "../../../public/Stars.svg";

export default function DashboardBanner({
  header,
  left = "#3498DB",
  right = "#3498DB",
}: TDashBoardBanner) {
  return (
    <div
      className="w-[99%] h-[180px] rounded-3xl pl-5 mx-auto flex justify-between"
      style={{
        background: `linear-gradient(${left},${right})`,
      }}
    >
      <div className="font-semibold w-4/6 text-xl leading-[30px] py-12 text-text-primary">
        {header}
      </div>
      <div style={{ height: "100%", display: "block" }}>
        <Image
          src={Stars}
          alt="stars"
          placeholder="empty"
          priority={false}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
