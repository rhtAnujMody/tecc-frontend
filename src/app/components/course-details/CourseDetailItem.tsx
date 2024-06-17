import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { TSection } from "@/types";
import CourseDetailContentItem from "./CourseDetailContentItem";

export default function CourseDetailItem(props: TSection) {
  return (
    <>
      <AccordionItem value={props.id}>
        <AccordionTrigger>
          <span className="font-semibold text-xl text-text-primary">
            {props.title}
          </span>
        </AccordionTrigger>
        {props.contents.map((value, index) => {
          return (
            <AccordionContent key={index} className="flex flex-col gap-5">
              <CourseDetailContentItem {...value} />
            </AccordionContent>
          );
        })}
      </AccordionItem>
    </>
  );
}
