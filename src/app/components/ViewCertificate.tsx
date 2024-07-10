import React, { useState } from "react";
import CommonDialog from "./CommonDialog";
import { Button } from "@/components/ui/button";
import { TCertifications } from "@/types";
import Image from "next/image";
import { ViewCertificateProps } from "@/types";

export default function ViewCertificate({ data }: ViewCertificateProps) {
  const [open, setOpen] = useState(false);
  console.log(data);

  const isPdf = (url: string) => {
    return url.toLowerCase().endsWith(".pdf");
  };

  return (
    <>
      <Button className="w-24" onClick={() => setOpen(true)}>
        View
      </Button>
      <CommonDialog
        open={open}
        closeDialog={() => {
          setOpen(false);
        }}
        classes="max-w-3xl"
      >
        <div>
          <div className="text-lg font-semibold text-text-primary">
            {data.course_name}
          </div>
          {data.credits_earned && (
            <div className="text-sm font-semibold">
              {data.credits_earned} credits earned
            </div>
          )}
          <div className="mt-4 relative w-full h-[500px] overflow-hidden">
            {data.certification_url ? (
              isPdf(data.certification_url) ? (
                <embed
                  src={`${data.certification_url}#toolbar=0&navpanes=0&scrollbar=0`}
                  type="application/pdf"
                  className="w-full h-full"
                ></embed>
              ) : (
                <Image
                  placeholder="empty"
                  src={data.certification_url}
                  alt="certificate"
                  fill={true}
                  priority={false}
                />
              )
            ) : null}
          </div>
          <hr />
          <a
            href={data.certification_url_download}
            download
            className="flex justify-end mt-4"
          >
            <Button className="w-24">Download</Button>
          </a>
        </div>
      </CommonDialog>
    </>
  );
}
