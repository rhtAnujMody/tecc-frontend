import { CarouselItem } from "@/components/ui/carousel";
import { TDashBoardBanner } from "@/types";

export default function DashboardBanner({
  header,
  color = "#3498DB",
}: TDashBoardBanner) {
  return (
    <CarouselItem
      className="w-full h-[180px] rounded-3xl py-12"
      style={{ backgroundColor: color }}
    >
      <div className="text-2xl font-semibold leading-[36px] text-white w-4/6">
        {header}
      </div>
    </CarouselItem>
  );
}
