import Image from "next/image";
import CourseDetailItem from "@/app/components/course-details/CourseDetailItem";
import { Accordion } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import fetchApi from "@/lib/api";
import { COURSEDETAIL, createAPIEndpoint } from "@/lib/constants";
import { ApiError, TCourse } from "@/types";
import course from "../../../../public/my-courses.svg";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Dialog, DialogOverlay } from "@/components/ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import Loader from "@/app/components/Loader";

// export async function generateMetadata({
//   params,
// }: {
//   params: { courseId: string };
// }) {
//   return {
//     title: "Course Detail",
//   };
// }

function CourseDetails({ id }: { id: string }) {
  const { data, error, isLoading, mutate } = useSWR(
    createAPIEndpoint(`${COURSEDETAIL}${id}/`),
    (url) => fetcher<TCourse>(url)
  );

  return isLoading ? (
    <div className="flex flex-1 justify-center items-center">
      <Loader></Loader>
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
          <span className="text-text-primary text-2xl font-semibold">
            {data?.title}
          </span>
          {!data?.is_enrolled ? (
            <div>
              <Button className="bg-primary">Enroll</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <div className="flex flex-1 justify-between text-xs text-text-secondary">
                <span className="">Course Progress</span>
                <span>{`${data?.course_progress}%`}</span>
              </div>
              <Progress value={data?.course_progress} className="h-2" />
            </div>
          )}
        </div>
      </div>
      {/* Sections */}
      <Accordion type="single" collapsible className="mt-5" defaultValue="0">
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

export default CourseDetails;
