import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { TSection } from "@/types";
import CourseDetailContentItem from "./CourseDetailContentItem";

export default function CourseDetailItem({
  props,
  index,
  isEnrolled,
  revalidate,
}: {
  props: TSection;
  index: number;
  isEnrolled: boolean;
  revalidate: () => void;
}) {
  return (
    <>
      <AccordionItem value={`${index}`}>
        <AccordionTrigger>
          <span className="font-semibold text-xl text-text-primary">
            {props.title}
          </span>
        </AccordionTrigger>
        {props.contents.map((value, index) => {
          return (
            <AccordionContent key={index} className="flex flex-col gap-5">
              <CourseDetailContentItem
                props={{ ...value }}
                isEnrolled={isEnrolled}
                revalidate={revalidate}
              />
            </AccordionContent>
          );
        })}
      </AccordionItem>
    </>
  );
}
