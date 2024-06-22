import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TCourse } from "@/types";
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
  sections,
  buttonText = "View Course",
  onClick,
}: TCourse) {
  const handleClick = () => {
    if (certification_course_url) {
      window.open(certification_course_url, "_blank", "noopener,noreferrer");
    } else {
      const data: Partial<TCourse> = {
        id: id,
        thumbnail: thumbnail,
        title: title,
      };
      onClick && onClick(data as TCourse);
    }
  };

  return (
    <div className="h-[380px] min-w-[300px] border flex flex-col rounded-lg relative">
      <Image
        src={thumbnail}
        sizes="100vh"
        width={0}
        height={0}
        alt="thumbnail"
        className="rounded-t-lg"
        style={{ width: "100%", height: 180, objectFit: "cover" }}
      />

      <div className="p-3 flex-col flex">
        <div className="flex flex-1 mb-3 gap-4">
          <span
            className={cn(
              "text-text-primary font-semibold text-base flex-1 line-clamp-1 ",
              credit && "basis-9/12"
            )}
          >
            {title}
          </span>
          {credit && (
            <div className="flex justify-center items-center  ">
              <Image
                src={credits}
                alt="credits"
                width={0}
                height={0}
                className="w-4 h-4"
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
            onClick={handleClick}
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
              : buttonText}
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
