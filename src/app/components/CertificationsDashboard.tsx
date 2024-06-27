import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetcher } from "@/lib/utils";
import { TCertifications } from "@/types";
import { useState } from "react";
import useSWR from "swr";
import Loader from "./Loader";
import TabContentData from "./TabContentData";

import { CERTIFICATIONSEARNED, createAPIEndpoint } from "@/lib/constants";

export default function CertificationsDashboard() {
	const [filter, setFilter] = useState("");
	const [defaultValue, setDefaultValue] = useState("earnedCertificate");
	const endpoint = createAPIEndpoint(`${CERTIFICATIONSEARNED}${filter}`);

	const { data, error, isLoading } = useSWR(endpoint, (url) =>
		fetcher<TCertifications[]>(url)
	);

	const headers = [
		"Course Name",
		"Course Category",
		"Completion Date",
		"Credits Earned",
		"View / Download",
	];

	const tabs = [
		{
			value: "earnedCertificate",
			filter: "",
			heading: "Reveal Certifications",
		},
		{
			value: "externalCertificate",
			filter: "true",
			heading: "External Certifications",
		},
	];

	const [earnedcurrentPage, setEarnedCurrentPage] = useState(1);
	const [externalCurrentPage, setExternalCurrentPage] = useState(1);

	return (
		<>
			{isLoading || !data ? (
				<div className="flex flex-1 h-full justify-center items-center ">
					<Loader />
				</div>
			) : (
				<div
					className="overflow-x-auto border mt-3 py-5 rounded-xl"
					style={{ borderColor: "#D0D5DD" }}
				>
					<Tabs defaultValue={defaultValue}>
						<div className="flex justify-between items-center px-5 mb-5">
							<TabsList className="flex gap-4 bg-white">
								{tabs.map((item, index) => (
									<TabsTrigger
										value={item.value}
										className="!shadow-none text-lg p-0 data-[state=active]:underline data-[state=active]:underline-offset-8"
										onClick={() => {
											setDefaultValue(item.value);
											setFilter(item.filter);
										}}
										key={index}
									>
										{item.heading}
									</TabsTrigger>
								))}
							</TabsList>

							<TabsContent value="externalCertificate" className="mt-0">
								<Button className="w-40" type="submit">
									Upload Certificate
								</Button>
							</TabsContent>
						</div>
						<TabContentData
							data={data}
							headers={headers}
							currentPage={earnedcurrentPage}
							type="certifications"
							setCurrentPage={setEarnedCurrentPage}
							tabValue="earnedCertificate"
						/>
						<TabContentData
							data={data}
							headers={headers}
							currentPage={externalCurrentPage}
							type="certifications"
							setCurrentPage={setExternalCurrentPage}
							tabValue="externalCertificate"
						/>
					</Tabs>
				</div>
			)}
		</>
	);
}
