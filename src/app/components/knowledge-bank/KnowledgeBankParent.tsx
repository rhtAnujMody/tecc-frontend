import { GETDROPDOWN, KNOWLEDGEBANK, createAPIEndpoint } from "@/lib/constants";
import { TDropdown, TKnowledgeBank } from "@/types";
import { useEffect, useState } from "react";
import useSWR from "swr";
import DropDown from "../DropDown";
import Loader from "../Loader";
import NoData from "../NoData";
import KnowledgeBankCard from "./KnowledgeBankCard";
import { fetcher } from "@/lib/api";
import Error from "../Error";

export default function KnowledgeBankParent() {
  const [filter, setFilter] = useState<TDropdown | string>("");
  const [dropDownArray, setDropDownArray] = useState<TDropdown[]>();

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
    setDropDownArray(dropdownData);
  }, [dropdownData]);

  if (error || dropdownError) return <Error />

  const showLoading = () => {
    return (
      <div className="flex flex-1 justify-center items-center">
        <Loader />
      </div>
    );
  };

  return (
    <div className="flex flex-1 w-full ">
      {dropdownLoading ? (
        showLoading()
      ) : isLoading ? (
        showLoading()
      ) : (
        <div className="flex flex-1 flex-col">
          <div className="flex justify-end">
            <DropDown
              props={dropDownArray ?? []}
              selectedFilter={(filter as TDropdown).name ?? "View All"}
              onClick={(value) => {
                setFilter(value);
              }}
            />
          </div>

          {data && data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-8 w-full h-fit mt-5">
              {data?.map((value) => {
                return (
                  <KnowledgeBankCard
                    key={value.id}
                    props={{ ...value }}
                    fromCaseStudy={false}
                  />
                );
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
