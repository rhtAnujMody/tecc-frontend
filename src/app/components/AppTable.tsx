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
    );
  };

  const creditsCell = (val: string | number) => {
    return (
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
    );
  };

  const viewBtnCell = (row: TCertifications) => {
    return (
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

              // Determine the content to be rendered based on the key
              let cellContent;
              if (key === "course_name") {
                cellContent = courseCell(value);
              } else if (key === "course_completion_date") {
                cellContent = new Date(value).toLocaleDateString();
              } else if (key === "credits_earned") {
                cellContent = creditsCell(value);
              } else if (key === "certification_url") {
                cellContent = viewBtnCell(row);
              } else {
                cellContent = (
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap w-44">
                    {value}
                  </div>
                );
              }
              return (
                <TableCell
                  key={key}
                  className="text-sm font-medium text-text-primary"
                >
                  {cellContent}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
