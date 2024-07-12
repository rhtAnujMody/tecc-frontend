import { cn } from "@/lib/utils";
import { TCaseStudy, TKnowledgeBank } from "@/types";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

export default function KnowledgeBankCard({
  props,
  fromCaseStudy,
}: {
  props: TKnowledgeBank | TCaseStudy;
  fromCaseStudy: boolean;
}) {
  return (
    <a href={props.article.article_url} target="_blank" className="relative">
      <div
        className={cn(
          "h-[380px] min-w-[300px] flex flex-col rounded-lg border",
          !fromCaseStudy && "h-[420px]"
        )}
      >
        <Image
          src={props.thumbnail}
          className="rounded-lg "
          alt="knowledge-bank-image"
          width={0}
          height={0}
          unoptimized
          style={{ width: "100%", height: 220, objectFit: "cover" }}
        />
        <div className="p-3 flex flex-col gap-2">
          <span className="text-primary text-sm font-semibold">
            {fromCaseStudy
              ? (props as TCaseStudy).client_name
              : (props as TKnowledgeBank).category_name}
          </span>
          <div className="flex flex-1 items-center">
            <span className="text-2xl basis-[95%] font-semibold line-clamp-1">
              {props.title}
            </span>
            <div className="flex justify-center items-center flex-1">
              <ArrowTopRightIcon width={20} height={20} />
            </div>
          </div>
          <span className="line-clamp-3 text-base text-text-secondary font-normal">
            {props.description}
          </span>
          {!fromCaseStudy && (
            <div className="mt-2 absolute bottom-2">
              <span className="text-xs text-text-secondary">
                {`Posted By: `}
                <span className="text-xs text-text-primary font-semibold">
                  {(props as TKnowledgeBank).username}
                </span>{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
