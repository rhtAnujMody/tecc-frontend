import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TCertifications } from "@/types";
import { useState } from "react";
import useSWR from "swr";
import Loader from "./Loader";
import TabContentData from "./TabContentData";
import { fetcher } from "@/lib/api";

import { INTERNALCERTIFICATIONSEARNED, EXTERNALCERTIFICATIONSEARNED, createAPIEndpoint } from "@/lib/constants";
import Error from "./Error";

export default function CertificationsDashboard() {
	const [isExternal, setIsExternal] = useState(false);
	const [defaultValue, setDefaultValue] = useState("earnedCertificate");
	const api = isExternal ? EXTERNALCERTIFICATIONSEARNED : INTERNALCERTIFICATIONSEARNED;
	const endpoint = createAPIEndpoint(api);

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
			isExternal: false,
			heading: "Reveal Certifications",
		},
		{
			value: "externalCertificate",
			isExternal: true,
			heading: "External Certifications",
		},
	];

	const [earnedcurrentPage, setEarnedCurrentPage] = useState(1);
	const [externalCurrentPage, setExternalCurrentPage] = useState(1);

	if (error) return <Error />

	return (
		<>
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
										setIsExternal(item.isExternal);
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
					{isLoading || !data ? (
						<div className="flex flex-1 h-full justify-center items-center ">
							<Loader />
						</div>
					) : (
						<>
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
						</>
					)}
				</Tabs>
			</div>
		</>
	);
}
