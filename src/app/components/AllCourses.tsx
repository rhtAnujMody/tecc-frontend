import { COURSESBYCATEGORY, createAPIEndpoint } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { TCourse } from "@/types";
import Image from "next/image";
import useSWR from "swr";
import defaultImage from "../../../public/course-default.svg";
import Course from "./Course";
import Loader from "./Loader";

export default function AllCourses({ id }: { id: string }) {
  const { data, error, isLoading } = useSWR(
    createAPIEndpoint(`${COURSESBYCATEGORY}${id}/`),
    (url) => fetcher<TCourse[]>(url)
  );

  return (
    <div className="flex flex-1 flex-col pb-5">
      {isLoading ? (
        <div className="flex flex-1 h-[3000px] justify-center items-center ">
          <Loader />
        </div>
      ) : (
        <>
          <Image
            src={defaultImage}
            alt="categoryImage"
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />

          <div className="grid grid-cols-4 gap-5 mt-5">
            {data?.map((value, index) => {
              return (
                <Course
                  key={index}
                  {...value}
                  count_of_lectures={`${value.count_of_lectures} lectures`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
