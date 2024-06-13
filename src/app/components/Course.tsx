import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TCategory, TCourse } from "@/types";
import Image from "next/image";
import credits from "../../../public/credit.svg";
import TotalLectures from "./TotalLectures";

export default function Course({
  id,
  category,
  certification_course_url,
  credit,
  description,
  is_certification_course,
  is_enrolled,
  is_mandatory,
  thumbnail,
  title,
  is_CourseCompleted,
  showLectures = true,
  count_of_lectures,
  onClick,
}: TCourse) {
  return (
    <div className="h-[350px] min-w-[250px] border flex flex-1 flex-col rounded-lg relative">
      <Image
        src={thumbnail}
        sizes="100vh"
        width={0}
        height={0}
        alt="thumbnail"
        className="rounded-t-lg"
        style={{ width: "100%", minHeight: 180, objectFit: "cover" }}
      />

      <div className="p-3 flex-col flex">
        <div className="flex flex-1 mb-3">
          <span
            className={cn(
              "text-text-primary font-semibold text-base flex-1",
              credit && "basis-9/12"
            )}
          >
            {title}
          </span>
          {credit && (
            <div className="flex flex-1 justify-center items-center  ">
              <Image
                src={credits}
                alt="credits"
                width={15}
                height={15}
                className="w-auto h-auto"
              />
              <span className="text-text-primary font-normal text-sm ml-1">
                {credit}
              </span>
            </div>
          )}
        </div>
        <span className="line-clamp-3 text-text-secondary text-sm font-normal">
          {description}
        </span>
        <div className="absolute bottom-3 text-sm font-normal">
          <Button
            onClick={() => {
              onClick && onClick(id!, title ?? "", thumbnail);
            }}
            className={cn(
              "bg-primary",
              is_CourseCompleted
                ? "bg-[#1ABC9C]"
                : is_enrolled && "bg-[#E67E22]"
            )}
          >
            {is_CourseCompleted
              ? "Watch Again"
              : is_enrolled
              ? "Resume Course"
              : "View Course"}
          </Button>
        </div>
      </div>
      {showLectures && (
        <div className="absolute top-3 right-3">
          <TotalLectures lectures={`${count_of_lectures}`} />
        </div>
      )}
    </div>
  );
}
