import { useToast } from "@/components/ui/use-toast";
import { fetchApi } from "@/lib/api";
import { TOGGLEPROGRESS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ApiError, TContent } from "@/types";
import Image from "next/image";
import { useState } from "react";
import lightBulb from "../../../../public/lightbulb.svg";
import paperClip from "../../../../public/paperclip.svg";
import playCircle from "../../../../public/play-circle.svg";
import time from "../../../../public/time.svg";
import yellowLightBulb from "../../../../public/yellow-bulb.svg";
import CommonDialog from "../CommonDialog";
import QuizDialog from "./QuizDialog";
import VideoPlayer from "../VideoPlayer";

export default function CourseDetailContentItem({
  props,
  isEnrolled,
  revalidate,
}: {
  props: TContent;
  isEnrolled: boolean;
  revalidate: () => void;
}) {
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const { toast } = useToast();
  const getTitle = () => {
    switch (props.type) {
      case "video":
        return props.video_name;
      default:
        return props.title;
    }
  };
  const getActionTitle = () => {
    switch (props.type) {
      case "video":
        return "Play Video";
      case "article":
        return "View Article";
      case "quiz":
        return "Start Quiz";
    }
  };

  const markVideoAsComplete = async (isVideo: boolean = true) => {
    let json = {};
    if (isVideo) {
      json = {
        video_id: props.id,
      };
    } else {
      json = {
        quiz_id: props.id,
      };
    }

    const response = await fetchApi<void, ApiError>(TOGGLEPROGRESS, {
      method: "POST",
      body: json,
    });

    if (response.status === 200) {
      setShowVideoDialog(false);
      setShowQuizDialog(false);
      revalidate();
    }
  };
  return (
    <>
      <div className="p-3 h-fit flex gap-2 border rounded-md">
        <div
          className={cn(
            "w-[60px] h-[60px] border-8 border-[#BCE4FF] rounded-lg flex justify-center items-center bg-[#F5FBFF]",
            props.is_mandatory && "border-[#FFDF8D] bg-[#FFF8E5]"
          )}
        >
          <Image
            src={
              props.type === "video"
                ? playCircle
                : props.is_mandatory
                ? yellowLightBulb
                : lightBulb
            }
            className="w-8 h-8"
            alt="video"
          />
        </div>
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
                {isEnrolled
                  ? props.is_completed
                    ? "Completed"
                    : "Pending"
                  : "Not Started"}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <div
              onClick={() => {
                if (isEnrolled) {
                  if (props.type === "video") {
                    setShowVideoDialog(true);
                  } else {
                    setShowQuizDialog(true);
                  }
                } else {
                  toast({ title: "Please enroll first" });
                }
              }}
              className={cn(
                "flex w-fit gap-1 items-center",
                props.articles && "border-r"
              )}
            >
              <Image
                src={
                  props.type === "video"
                    ? playCircle
                    : props.is_mandatory
                    ? yellowLightBulb
                    : lightBulb
                }
                alt="play"
                className="rounded-sm w-4 h-4"
              />

              <span
                className={cn(
                  "text-primary font-normal text mr-2 cursor-pointer",
                  props.is_mandatory && "text-[#FFB800]"
                )}
              >
                {getActionTitle()}
              </span>
            </div>
            {props.articles && (
              <div className={cn("flex w-fit gap-1 items-center")}>
                <Image
                  src={paperClip}
                  alt="play"
                  className="rounded-sm w-4 h-4"
                />
                <a
                  onClick={(event) => {
                    if (!isEnrolled) {
                      event.preventDefault();
                      toast({ title: "Please enroll first" });
                    }
                  }}
                  className={cn(
                    "text-primary font-normal text mr-2 cursor-pointer"
                  )}
                  href={props.articles?.article_url}
                  target="_blank"
                >
                  Resources
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <CommonDialog
        open={showVideoDialog}
        closeDialog={() => setShowVideoDialog(false)}
        title={props.video_name}
        classes="max-w-5xl"
      >
        <VideoPlayer
          videoSrc={props.video_url ?? ""}
          onEnded={() => {
            markVideoAsComplete();
          }}
          onError={(e) => {
            toast({
              title: "Error",
              variant: "destructive",
              description: "Video file not found or file might be corrupted",
            });
          }}
        />
        {/* <video
        controls
          className="w-full h-full custom-video"
          onEnded={() => {
            markVideoAsComplete();
          }}
          controlsList="nodownload noremoteplayback noplaybackrate"
          preload="metadata"
          onError={(e) => {
            toast({
              title: "Error",
              variant: "destructive",
              description: "Video file not found or file might be corrupted",
            });
          }}
        >
          <source src={props.video_url} type="video/mp4" />
        </video> */}
      </CommonDialog>

      {showQuizDialog && (
        <QuizDialog
          questions={props.questions}
          showDialog={showQuizDialog}
          title={props.title ?? "Questions"}
          id={props.id}
          isMandatory={props.is_mandatory!}
          closeQuiz={(revalidate) => {
            if (revalidate) {
              markVideoAsComplete(false);
            } else {
              setShowQuizDialog(false);
            }
          }}
        />
      )}
    </>
  );
}
