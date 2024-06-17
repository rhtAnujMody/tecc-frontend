import Image from "next/image";

import CourseDetailItem from "@/app/components/course-details/CourseDetailItem";
import { Accordion } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import fetchApi from "@/lib/api";
import { COURSEDETAIL, createAPIEndpoint } from "@/lib/constants";
import { ApiError, TCourse } from "@/types";
import course from "../../../../public/my-courses.svg";

export async function generateMetadata({
  params,
}: {
  params: { courseId: string };
}) {
  return {
    title: "Course Detail",
  };
}

async function CourseDetails({ params }: { params: { courseId: string } }) {
  const getCourseDetails = async () => {
    const apiResponse = await fetchApi<TCourse, ApiError>(
      createAPIEndpoint(COURSEDETAIL),
      { method: "GET" }
    );
    return apiResponse;
  };

  const response = await getCourseDetails();
  console.log(response.data?.sections);

  return (
    <div className="flex flex-1 bg-white p-5 flex-col">
      <div className="flex p-5 border border-text-text-secondary h-fit w-full rounded-lg gap-5">
        <Image
          src={response.data?.thumbnail!}
          className="object-fill rounded-md"
          width={200}
          height={0}
          alt="course images"
        />
        <div className="flex flex-col justify-between w-[80%]">
          <span className="text-text-secondary text-xs font-semibold">
            {response.data?.category_name}
          </span>
          <span className="text-text-primary text-2xl font-semibold">
            {response.data?.title}
          </span>
          <div className="flex flex-col gap-1">
            <div className="flex flex-1 justify-between text-xs text-text-secondary">
              <span className="">Course Progress</span>
              <span>{`${response.data?.course_progress}%`}</span>
            </div>
            <Progress value={response.data?.course_progress} className="h-2" />
          </div>
        </div>
      </div>
      {/* Sections */}
      <Accordion type="single" collapsible className="mt-5">
        {response.data?.sections.map((sections, index) => {
          return <CourseDetailItem key={sections.id} {...sections} />;
        })}
      </Accordion>
    </div>
  );
}

export default CourseDetails;
