import React from "react";
import { ContributorProps } from "@/types";

const Contributor = ({ contributors }: ContributorProps) => {
  const formattedContributors = contributors.map((contributor, index) => {
    const name = `${contributor.first_name} ${contributor.last_name[0]}`;

    return (
      <span key={index}>
        {name}
        {index < contributors.length - 1 && ", "}
      </span>
    );
  });

  return (
    <div className="mt-2 absolute bottom-2">
      <span className="text-xs text-text-secondary">
        {`Posted By: `}
        <span className="text-xs text-text-primary font-semibold capitalize">
          {formattedContributors}
        </span>
      </span>
    </div>
  );
};

export default Contributor;
