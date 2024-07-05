import React, { useState } from "react";
import CommonDialog from "./CommonDialog";
import { Button } from "@/components/ui/button";
import { TCertifications } from "@/types";

interface ViewCertificateProps {
  data: TCertifications;
}

export default function ViewCertificate({ data }: ViewCertificateProps) {
  const [open, setOpen] = useState(false);
  console.log(data);

  const fileExtension =
    data.certification_url && data.certification_url.split(".").pop();
  const isImage =
    fileExtension &&
    ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
      fileExtension.toLowerCase()
    );
  const isPdf = fileExtension && fileExtension.toLowerCase() === "pdf";

  return (
    <>
      <Button className="w-24" onClick={() => setOpen(true)}>
        View
      </Button>
      <CommonDialog
        open={open}
        setDefault={() => {
          setOpen(false);
        }}
        classes="max-w-5xl"
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
          <div className="mt-4" style={{ height: "300px" }}>
            <embed
              src={data.certification_url}
              type="application/pdf"
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
          </div>
          <hr />
          <div className="flex justify-end mt-4">
            <Button className="w-24">Download</Button>
          </div>
        </div>
      </CommonDialog>
    </>
  );
}
