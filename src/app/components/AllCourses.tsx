import { fetcher } from "@/lib/api";
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
  errMessage,
}: {
  url: string;
  thumbnail?: string;
  onCourseClick: (items: TCourse) => void;
  errMessage?: string;
}) {
  const { data, error, isLoading, isValidating } = useSWR(url, (url) =>
    fetcher<TCourse[]>(url)
  );

  return (
    <div className="flex flex-1 flex-col pb-5 mt-5">
      {isLoading || isValidating ? (
        <div className="flex flex-1 justify-center items-center ">
          <Loader />
        </div>
      ) : data && data?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-5 w-full h-fit">
          {data?.map((value, index) => {
            return (
              <Course
                key={index}
                {...value}
                count_of_lectures={`${value?.count_of_lectures} ${
                  parseInt(value?.count_of_lectures ?? "0") === 1
                    ? "lecture"
                    : "lectures"
                } `}
                onClick={onCourseClick}
              />
            );
          })}
        </div>
      ) : (
        <NoData errMessage={errMessage} />
      )}
    </div>
  );
}
