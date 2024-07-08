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
import ViewCertificate from "./ViewCertificate";

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

  const courseCell = (val: string | number) => {
    return (
      <TableCell className="text-sm font-medium text-text-primary">
        <div className="flex items-center gap-2">
          <Image
            src={certificate}
            alt="image"
            width={50}
            height={50}
            priority={false}
          />
          <div className="overflow-hidden text-ellipsis whitespace-nowrap w-44">
            {val}
          </div>
        </div>
      </TableCell>
    );
  };

  const completionDateCell = (val: string | number) => {
    const formattedDate = new Date(val).toLocaleDateString();
    return (
      <TableCell className="text-sm font-medium text-text-primary">
        {formattedDate}
      </TableCell>
    );
  };

  const creditsCell = (val: string | number) => {
    return (
      <TableCell className="text-sm font-medium text-text-primary">
        <div className="flex items-center gap-2">
          <Image
            src={trophy}
            alt="image"
            width={20}
            height={20}
            priority={false}
          />
          {val}
        </div>
      </TableCell>
    );
  };

  const viewBtnCell = (row: TCertifications) => {
    return (
      <TableCell>
        <div className="flex items-center gap-5">
          <ViewCertificate data={row} />

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
            {Object.entries(row).map(([key, value], i) => {
              if (i > 5 || i === 0) {
                return null;
              }

              return key === "course_name" ? (
                courseCell(value)
              ) : key === "course_completion_date" ? (
                completionDateCell(value)
              ) : key === "credits_earned" ? (
                creditsCell(value)
              ) : key === "certification_url" ? (
                viewBtnCell(row)
              ) : (
                <TableCell
                  key={key}
                  className="text-sm font-medium text-text-primary"
                >
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap w-44">
                    {value}
                  </div>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
