import { GETDROPDOWN, KNOWLEDGEBANK, createAPIEndpoint } from "@/lib/constants";
import { fetcher } from "@/lib/utils";
import { TDropdown, TKnowledgeBank } from "@/types";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import DropDown from "../DropDown";
import Loader from "../Loader";
import KnowledgeBankCard from "./KnowledgeBankCard";
import NoData from "../NoData";

export default function KnowledgeBankParent() {
  const [filter, setFilter] = useState<TDropdown | string>("");
  const [dropDownArray, setDropDownArray] = useState<TDropdown[]>();
  //const dropdownArray = useRef<TDropdown[]>([]);
  const isAPICalled = useRef(false);

  const endpoint = createAPIEndpoint(
    `${KNOWLEDGEBANK}?category_id=${filter && (filter as TDropdown).id}`
  );

  const {
    data: dropdownData,
    error: dropdownError,
    isLoading: dropdownLoading,
  } = useSWR(createAPIEndpoint(`${GETDROPDOWN}category`), (url) =>
    fetcher<TDropdown[]>(url)
  );

  const { data, error, isLoading, mutate } = useSWR(endpoint, (url) =>
    fetcher<TKnowledgeBank[]>(url)
  );

  useEffect(() => {
    console.log("dd", dropdownData);
    setDropDownArray(dropdownData);
    // console.log("dropdown array", dropdownArray.current);
    return () => {
      console.log("cleanup");
    };
  }, [dropdownData]);

  return (
    <div className="flex flex-1 w-full ">
      {isLoading ? (
        <div className="flex flex-1 justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="flex justify-end">
            <DropDown
              props={dropDownArray ?? []}
              selectedFilter={(filter as TDropdown).name ?? "View All"}
              onClick={(value) => {
                isAPICalled.current = true;
                setFilter(value);
              }}
            />
          </div>

          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-8 w-full h-fit mt-5">
              {data?.map((value) => {
                return <KnowledgeBankCard key={value.id} {...value} />;
              })}
            </div>
          ) : (
            <NoData />
          )}
        </div>
      )}
    </div>
  );
}
