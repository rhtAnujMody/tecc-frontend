import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TCertifications } from "@/types";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import Loader from "./Loader";
import TabContentData from "./TabContentData";
import { fetcher } from "@/lib/api";
import UploadCertificateModal from "./UploadCertificateModal";

import {
  INTERNALCERTIFICATIONSEARNED,
  EXTERNALCERTIFICATIONSEARNED,
} from "@/lib/constants";
import Error from "./Error";

export default function CertificationsDashboard() {
  const [isExternal, setIsExternal] = useState(false);
  const [defaultValue, setDefaultValue] = useState("earnedCertificate");
  const api = isExternal
    ? EXTERNALCERTIFICATIONSEARNED
    : INTERNALCERTIFICATIONSEARNED;

  const { data, error, isLoading } = useSWR(api, (url: string) =>
    fetcher<TCertifications[]>(url)
  );

  const handleCloseDialog = () => {
    setShowDialog(false);
    setExternalCurrentPage(1);
    // Re-fetch the external certificates data when dialog closes
    if (isExternal) {
      mutate(EXTERNALCERTIFICATIONSEARNED);
    }
  };

  const headers = [
    "Course Name",
    "Course Category",
    "Completion Date",
    "Credits Earned",
    "View / Download",
  ];

  const tabs = [
    {
      value: "earnedCertificate",
      isExternal: false,
      heading: "Reveal Certifications",
    },
    {
      value: "externalCertificate",
      isExternal: true,
      heading: "External Certifications",
    },
  ];

  const [earnedcurrentPage, setEarnedCurrentPage] = useState(1);
  const [externalCurrentPage, setExternalCurrentPage] = useState(1);

  //dialog box settings
  const [showDialog, setShowDialog] = useState(false);

  if (error) return <Error />;

  return (
    <>
      <div
        className="overflow-x-auto border mt-3 py-5 rounded-xl"
        style={{ borderColor: "#D0D5DD" }}
      >
        <Tabs defaultValue={defaultValue}>
          <div className="flex justify-between items-center px-5 mb-5">
            <TabsList className="flex gap-4 bg-white">
              {tabs.map((item, index) => (
                <TabsTrigger
                  value={item.value}
                  className="!shadow-none text-lg p-0 data-[state=active]:underline data-[state=active]:underline-offset-8"
                  onClick={() => {
                    setDefaultValue(item.value);
                    setIsExternal(item.isExternal);
                  }}
                  key={index}
                >
                  {item.heading}
                </TabsTrigger>
              ))}
            </TabsList>

            <UploadCertificateModal
              setShowDialog={setShowDialog}
              open={showDialog}
              title=""
              onClose={handleCloseDialog}
            />
          </div>
          {isLoading || !data ? (
            <div className="flex flex-1 h-full justify-center items-center ">
              <Loader />
            </div>
          ) : (
            <>
              <TabContentData
                data={data}
                headers={headers}
                currentPage={earnedcurrentPage}
                type="certifications"
                setCurrentPage={setEarnedCurrentPage}
                tabValue="earnedCertificate"
              />
              <TabContentData
                data={data}
                headers={headers}
                currentPage={externalCurrentPage}
                type="certifications"
                setCurrentPage={setExternalCurrentPage}
                tabValue="externalCertificate"
              />
            </>
          )}
        </Tabs>
      </div>
    </>
  );
}
