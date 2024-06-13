import { DASHBOARD, createAPIEndpoint } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { TDashboard } from "@/types";
import useSWR from "swr";
import Course from "../Course";
import Loader from "../Loader";
import CourseHighlights from "./CourseHighlights";
import SectionHeaders from "./SectionHeaders";

export default function DashboardHome({
  onClick,
}: {
  onClick: (id: string, title: string, thumbnail: string) => void;
}) {
  const { data, error, isLoading } = useSWR(
    createAPIEndpoint(`${DASHBOARD}`),
    (url) => fetcher<TDashboard>(url)
  );
  return (
    <div className="mt-5 h-full ">
      {isLoading ? (
        <div className="flex flex-1 h-full justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-auto">
          <CourseHighlights
            creditsEarned={data?.credits ?? 0}
            totalEntrolledCourses={data?.enrolled_course_count ?? 0}
            pendingCourses={data?.pending_course_count ?? 0}
          />
          <div className="mt-10">
            <SectionHeaders
              header="Mandatory Courses"
              desc="These Courses are mandatory and needs to be completed within this month"
            />

            <div className="flex gap-5 overflow-x-auto mt-3">
              {data?.mandatory_courses.map((value) => (
                <Course
                  key={value.id}
                  {...value}
                  count_of_lectures={`${value.count_of_lectures} lectures`}
                />
              ))}
            </div>
          </div>

          <div className="mt-10">
            <SectionHeaders header="Browse through different course category" />
            <div className="flex gap-5 overflow-x-auto mt-3">
              {data?.categories.map((value) => (
                <Course
                  key={value.id}
                  id={value.id}
                  title={value.name}
                  description={value.description}
                  thumbnail={value.thumbnail}
                  count_of_lectures={`${value.courses_count} Courses`}
                  onClick={onClick}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
