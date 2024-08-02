import React, { useState, useTransition, useRef } from "react";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { TUploadCertificateModal } from "@/types";
import CommonDialog from "./CommonDialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Upload from "../../../public/Upload.svg";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
import { checkIsEmpty, dateGenerator } from "@/lib/utils";
import DatePicker from "./DatePicker";
import { fetchApi } from "@/lib/api";
import { UPLOADCERTIFICATE } from "@/lib/constants";
import { ApiError } from "@/types";
import certificate from "../../../public/miniCertificate.svg";

export default function UploadCertificateModal({
  setShowDialog,
  open,
  title,
  onClose,
}: TUploadCertificateModal) {
  const [institueName, setInstitueName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [date, setDate] = useState<Date>();
  const [photoSrc, setPhotoSrc] = useState(Upload);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const handleInstituteNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstitueName(e.target.value);
  };
  const handleCourseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCourseName(e.target.value);
  };

  const showErrorToast = (desc: string) => {
    toast({
      title: "Error",
      description: desc,
      variant: "destructive",
      duration: 2000,
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileType = file.type;

      const validImageTypes = ["image/jpeg", "image/png"];
      if (fileType === "application/pdf") {
        setPhotoSrc(certificate);
      } else if (validImageTypes.includes(fileType)) {
        try {
          const fileSizeInMB = file.size / (1024 * 1024); // size in MB

          // Check if the size exceeds 1 MB
          if (fileSizeInMB > 1) {
            showErrorToast(
              "The selected image is larger than 1 MB. Please select a smaller image."
            );
            return;
          }

          // If the size is within the limit, proceed
          const newPhotoSrc = URL.createObjectURL(file);
          setPhotoSrc(newPhotoSrc);
          setPhotoFile(file);
        } catch (error) {
          showErrorToast("Error compressing image. Please try again.");
        }
      } else {
        showErrorToast("Please select a valid JPG, PNG, GIF, or PDF file.");
        return;
      }

      setPhotoFile(file);
    }
  };

  const openFileExplorer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const setDefault = () => {
    setInstitueName("");
    setCourseName("");
    setDate(undefined);
    setShowDialog(false);
    setPhotoSrc(Upload);
  };

  const callAPI = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (
        checkIsEmpty(institueName) ||
        checkIsEmpty(courseName) ||
        checkIsEmpty(dateGenerator(date))
      ) {
        showErrorToast("All fields are mandatory");
        return;
      }

      if (!photoFile) {
        showErrorToast("Please upload a certificate.");
        return;
      }

      const formData = new FormData();
      formData.append("institution_name", institueName);
      formData.append("course_name", courseName);
      formData.append(
        "course_completion_date",
        dateGenerator(date, "YYYY-MM-DD")
      );
      if (photoFile) {
        formData.append("file", photoFile);
      }

      const response = await fetchApi<void, ApiError>(UPLOADCERTIFICATE, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log(response.data);

        toast({
          title: "Success",
          description: "Uploaded certificate successfully",
        });
        setDefault();
        onClose();
      } else {
        console.log("error", response.error);

        if (response.error && typeof response.error === "object") {
          const errorObj = response.error as { [key: string]: any };

          const keys = Object.keys(errorObj);
          let errMessage = "";
          // Check if there is at least one key and if its value is an array with at least one element
          if (
            keys.length > 0 &&
            Array.isArray(errorObj[keys[0]]) &&
            errorObj[keys[0]].length > 0
          ) {
            // Access the first key directly and get its first error message
            errMessage = errorObj[keys[0]][0];
          } else {
            errMessage =
              "Something unexpected error occurred. Please try again later.";
          }

          // Show an error toast with a message
          toast({
            title: "Error",
            description: errMessage,
            variant: "destructive",
          });
          setDefault();
          onClose();
        } else {
          toast({
            title: "Error",
            description:
              "Something unexpected error occurred. Please try again later.",
            variant: "destructive",
          });
          setDefault();
          onClose();
        }
      }
    });
  };

  return (
    <>
      <TabsContent value="externalCertificate" className="mt-0">
        <Button className="w-40" onClick={() => setShowDialog(true)}>
          Upload Certificate
        </Button>
      </TabsContent>
      <CommonDialog
        open={open}
        classes="w-[500px] bg-greyBackground"
        closeDialog={setDefault}
      >
        <div className="w-[372px] mx-auto">
          <div className="text-center text-text-header text-2xl font-semibold">
            External Certificate
          </div>
          <div className="text-base font-normal text-center text-text-primary mt-2">
            Please enter your details and upload the external certificate.
          </div>
          <div className="mt-5">
            <div className="text-text-primary text-sm font-medium">Upload</div>
            <div className="mt-2 flex gap-4">
              <div className="relative h-16 w-16 bg-white rounded-full  flex-shrink-0 cursor-pointer">
                <Image
                  src={photoSrc}
                  fill={true}
                  alt="profileIcon"
                  placeholder="empty"
                  onClick={openFileExplorer}
                  style={{ borderRadius: "100%", objectFit: "scale-down" }}
                />
              </div>

              <input
                id="fileInput"
                ref={fileInputRef}
                type="file"
                accept="image/*,application/pdf"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
              <div
                className="flex-1 bg-white px-2 py-6 rounded-lg font-normal text-sm text-text-descColor cursor-pointer"
                onClick={openFileExplorer}
              >
                <span style={{ color: "#3498DB" }}>
                  {`Click "+" to upload `}
                </span>
                PNG, JPG or PDF files
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <Input
              label="Institution Name"
              placeholder="Enter Institution Name"
              value={institueName}
              onChange={handleInstituteNameChange}
            />
            <Input
              label="Course Name"
              placeholder="Enter Course Name"
              value={courseName}
              onChange={handleCourseNameChange}
            />
            <div className="w-full">
              <DatePicker
                date={date}
                setDate={setDate}
                disableFutureDates={true}
              />
            </div>
            <Button className="w-full" disabled={isPending} onClick={callAPI}>
              {isPending && (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit
            </Button>
          </div>
        </div>
      </CommonDialog>
    </>
  );
}
