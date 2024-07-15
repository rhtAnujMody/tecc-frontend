import React from "react";
import { ContributorProps } from "@/types";
import { formatContributors } from "@/lib/utils";

const Contributor = ({ contributors }: ContributorProps) => {
  const formattedContributors = formatContributors(contributors);

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
