import Loader from "@/app/components/Loader";
import CourseDetailItem from "@/app/components/course-details/CourseDetailItem";
import { useUserContext } from "@/app/context/UserContext";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { fetcher, fetchApi } from "@/lib/api";
import { COURSEDETAIL, ENROLLCOURSE, createAPIEndpoint } from "@/lib/constants";
import { ApiError, TCourse } from "@/types";
import Image from "next/image";
import { useState } from "react";
import useSWR from "swr";
import Error from "../Error";

function CourseDetailsMain({ id }: { id: string }) {
  const { updateUserData, user } = useUserContext();
  const [isEnrollLoading, setIsEnrollLoading] = useState(false);
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    createAPIEndpoint(`${COURSEDETAIL}${id}/`),
    (url) => fetcher<TCourse>(url),
    {
      onSuccess(data, key, config) {
        console.log("on success");
        if (data.is_CourseCompleted) {
          updateUserData(user!, true);
        }
      },
    }
  );

  const enrollCourse = async () => {
    setIsEnrollLoading(true);

    const endpoint = createAPIEndpoint(ENROLLCOURSE);

    const response = await fetchApi<void, ApiError>(endpoint, {
      method: 'POST',
      body: {
        course_id: data?.id ?? "",
      },
    });

    if (response.ok) {
      mutate();
    } else {
      toast({ title: "Error" });
    }
    setIsEnrollLoading(false);
  };

  const getCurrentOpenIndex = () => {
    let currentIndex = "0";

    // Check if data and sections exist
    if (data?.sections) {
      for (let index = 0; index < data.sections.length; index++) {
        const section = data.sections[index];

        if (section.contents) {
          for (
            let contentIndex = 0;
            contentIndex < section.contents.length;
            contentIndex++
          ) {
            const content = section.contents[contentIndex];
            console.log("index", index);
            console.log("content index", contentIndex);
            console.log("is completed", content.is_completed);
            console.log("current index", currentIndex);

            if (!content.is_completed) {
              currentIndex = `${index}`;
              return currentIndex;
            }
          }
        }
      }
    }

    return currentIndex;
  };

  if (error) return <Error />

  return isLoading || isValidating ? (
    <div className="flex flex-1 justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-1 bg-white p-5 flex-col">
      <div className="flex p-5 border border-text-text-secondary h-fit w-full rounded-lg gap-5">
        <Image
          src={data?.thumbnail!}
          className="object-fill rounded-md"
          width={200}
          height={0}
          alt="course images"
        />
        <div className="flex flex-col justify-between w-[80%]">
          <span className="text-text-secondary text-xs font-semibold">
            {data?.category_name}
          </span>
          <span className="text-text-primary text-2xl font-semibold mt-2">
            {data?.title}
          </span>
          {!data?.is_enrolled ? (
            <div className="h-10 items-center flex">
              {isEnrollLoading ? (
                <Loader />
              ) : (
                <Button className="bg-primary" onClick={enrollCourse}>
                  Enroll
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 mt-2">
              <div>
                <div className="flex flex-1 justify-between text-xs text-text-secondary">
                  <span className="">Course Progress</span>
                  <span>{`${data?.course_progress}%`}</span>
                </div>
                <Progress value={data?.course_progress} className="h-2" />
                {/* <Loader className="self-center" /> */}
              </div>
              {data.is_CourseCompleted && (
                <a
                  href="https://drive.google.com/file/d/1yuAxSRZ8jK8bk-yrL61op-xEgQg4PWb1/view?usp=sharing"
                  target="_blank"
                >
                  <Button className="w-40">View Certificate</Button>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Sections */}
      <Accordion
        type="single"
        collapsible
        className="mt-5"
        defaultValue={getCurrentOpenIndex()}
      >
        {data?.sections?.map((sections, index) => {
          return (
            <CourseDetailItem
              key={sections.id}
              props={{ ...sections }}
              index={index}
              isEnrolled={data.is_enrolled ?? false}
              revalidate={() => {
                mutate();
              }}
            />
          );
        })}
      </Accordion>
    </div>
  );
}

export default CourseDetailsMain;
