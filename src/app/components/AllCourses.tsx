import { COURSESBYCATEGORY, createAPIEndpoint } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { TCourse } from "@/types";
import Image from "next/image";
import useSWR from "swr";
import Course from "./Course";
import Loader from "./Loader";
import NoData from "./NoData";

export default function AllCourses({
  url,
  thumbnail,
  onCourseClick,
}: {
  url: string;
  thumbnail?: string;
  onCourseClick: (items: TCourse) => void;
}) {
  const { data, error, isLoading } = useSWR(url, (url) =>
    fetcher<TCourse[]>(url)
  );

  return (
    <div className="flex flex-1 flex-col pb-5">
      {isLoading ? (
        <div className="flex flex-1 h-[3000px] justify-center items-center ">
          <Loader />
        </div>
      ) : data && data?.length > 0 ? (
        <div className="grid grid-cols-4 gap-5 mt-5">
          {data?.map((value, index) => {
            return (
              <Course
                key={index}
                {...value}
                count_of_lectures={`${value.count_of_lectures} lectures`}
                onClick={onCourseClick}
              />
            );
          })}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
