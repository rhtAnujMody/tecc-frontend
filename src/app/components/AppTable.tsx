import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ITEMSPERPAGE } from "@/lib/constants";
import { TAppTable, TCertifications } from "@/types";
import Image from "next/image";
import trophy from "../../../public/credit.svg";
import download from "../../../public/download.svg";
import certificate from "../../../public/miniCertificate.svg";

export default function AppTable({
  headers,
  data,
  currentPage,
  type,
}: TAppTable) {
  const currentData = (data as TCertifications[]).slice(
    (currentPage - 1) * ITEMSPERPAGE || 0,
    currentPage * ITEMSPERPAGE
  );

  const certificationCells = (row: TCertifications) => {
    const formattedDate = row.completion_date
      ? new Date(row.completion_date).toLocaleDateString()
      : "N/A";

    const driveUrl = row.certification_url
      ? `https://drive.google.com/viewerng/viewer?url=${encodeURIComponent(
          row.certification_url
        )}`
      : "#";
    return (
      <>
        <TableCell className="text-sm font-medium text-text-primary">
          <div className="flex items-center gap-2">
            <Image
              src={certificate}
              alt="image"
              width={50}
              height={50}
              priority={false}
            />
            {row.course_name}
          </div>
        </TableCell>
        <TableCell className="text-sm font-medium text-text-primary">
          {row.course_category}
        </TableCell>
        <TableCell className="text-sm font-medium text-text-primary">
          {formattedDate}
        </TableCell>
        <TableCell className="text-sm font-medium text-text-primary">
          <div className="flex items-center gap-2">
            <Image
              src={trophy}
              alt="image"
              width={20}
              height={20}
              priority={false}
            />
            {row.credits_earned}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-5">
            <a href={driveUrl} target="_blank">
              <Button className="w-24" type="submit">
                View
              </Button>
            </a>

            <Image
              src={download}
              alt="image"
              width={20}
              height={20}
              priority={false}
              className="hidden"
            />
          </div>
        </TableCell>
      </>
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow style={{ backgroundColor: "#EAECF0" }}>
          {headers.map((key) => (
            <TableHead
              key={key}
              className="text-base leading-[18px] font-medium text-black"
            >
              {key}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentData.map((row) => (
          <TableRow key={row.id}>
            {type === "certifications"
              ? certificationCells(row)
              : Object.entries(row).map(([key, value], i) => (
                  <TableCell
                    key={key}
                    className="text-sm font-medium text-text-primary"
                  >
                    {value}
                  </TableCell>
                ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
