import { TCourseCard } from "@/types";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function CourseCard({
  thumbnail,
  header,
  description,
  onClick,
}: TCourseCard) {
  return (
    <div
      className="max-h-[380px] border flex flex-col rounded-xl relative pb-3 cursor-pointer"
      onClick={onClick}
    >
      <Image
        src={thumbnail}
        sizes="100vh"
        width={0}
        height={0}
        alt="thumbnail"
        className="rounded-t-lg"
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />

      <div className="flex justify-between px-2 mt-5 items-center">
        <div className="text-base font-medium">{header}</div>
        <ArrowTopRightIcon className="text-text-secondary font-medium cursor-pointer" />
      </div>
      <div className="px-2 text-sm font-normal text-text-secondary mt-2">
        {description}
      </div>
    </div>
  );
}
