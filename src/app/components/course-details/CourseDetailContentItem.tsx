import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import video from "../../../../public/video.svg";
import time from "../../../../public/time.svg";
import play from "../../../../public/play.svg";
import { TContent } from "@/types";
import { Button } from "@/components/ui/button";

export default function CourseDetailContentItem(props: TContent) {
  const getTitle = () => {
    switch (props.type) {
      case "video":
        return props.video_name;
      case "article":
        return props.article_name;
      case "quiz":
        return props.quiz_name;
    }
  };
  const getActionTitle = () => {
    switch (props.type) {
      case "video":
        return "Play Video";
      case "article":
        return "View Article";
      case "quiz":
        return "Take Quiz";
    }
  };
  return (
    <div className="p-3 h-fit flex gap-2 border rounded-md">
      {props.type === "video" ? (
        <div className="w-[60px] h-[60px]">
          <Image src={video} className="w-full h-full" alt="video" />
        </div>
      ) : null}

      <div className="flex flex-1 justify-between flex-col gap-3">
        <div className="flex gap-2  h-[70px]">
          <div className="flex flex-1 justify-between pb-4 border-b ">
            <div className="flex flex-col justify-between">
              <span className="text-text-primary font-semibold text-lg">
                {getTitle()}
              </span>

              {props.type === "video" ? (
                <div className="flex items-center gap-1">
                  <Image src={time} alt="time" width={12} height={12} />
                  <span className="text-text-secondary font-normal text-xs">
                    {props.duration}
                  </span>
                </div>
              ) : null}
            </div>

            <div
              className={cn(
                "py-2 px-3  h-fit rounded-2xl text-xs text-text-primary",
                props.is_completed ? "bg-[#A2E6B9]" : "bg-[#FFE8BC]"
              )}
            >
              Pending
            </div>
          </div>
        </div>
        <div>
          <div className="flex w-fit gap-1 items-center ">
            {props.type === "video" ? (
              <Image
                src={play}
                alt="play"
                className="border border-primary  rounded-sm w-4 h-4"
              />
            ) : null}

            <a
              className="text-primary font-normal text mr-2 cursor-pointer"
              href={props.article_url}
            >
              {getActionTitle()}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
