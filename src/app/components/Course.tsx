import Image from "next/image";
import React from "react";
import placeholderThumnail from "../../../public/course-default.svg";
import credits from "../../../public/credit.svg";
import { Button } from "@/components/ui/button";
import TotalLectures from "./TotalLectures";

export default function Course() {
  return (
    <div className="w-[250px] h-[350px] border flex flex-1 flex-col rounded-md relative">
      <Image src={placeholderThumnail} alt="thumbnail"></Image>
      <div className="p-3 flex-col flex">
        <div className="flex flex-1 mb-3">
          <span className="text-text-primary font-semibold text-base basis-9/12 ">
            Course 1
          </span>
          <div className="flex flex-1 justify-center items-center  ">
            <Image src={credits} alt="credits" width={15} height={15} />
            <span className="text-text-primary font-normal text-sm ml-1">
              20
            </span>
          </div>
        </div>
        <span className="line-clamp-3 text-text-secondary text-sm font-normal">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </span>
        <div className="absolute bottom-3 text-sm font-normal">
          <Button>View Course</Button>
        </div>
      </div>
      <div className="absolute top-3 right-3">
        <TotalLectures />
      </div>
    </div>
  );
}
