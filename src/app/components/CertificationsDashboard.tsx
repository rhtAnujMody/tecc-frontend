import { useState } from "react";
import { callAPI, fetcher } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TCertifications } from "@/types";
import AppTable from "./AppTable";
import TablePagination from "./TablePagination";
import useSWR from "swr";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loader from "./Loader";

import { CERTIFICATIONSEARNED, createAPIEndpoint } from "@/lib/constants";

export default function CertificationsDashboard() {
	const { data, error, isLoading } = useSWR(
		createAPIEndpoint(`${CERTIFICATIONSEARNED}`),
		(url) => fetcher<TCertifications[]>(url)
	);

	console.log("cert", data);

	const headers = [
		"Course Name",
		"Course Category",
		"Completion Date",
		"Credits Earned",
		"View / Download",
	];
	const externalData = [
		{
			id: 1,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 2,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 3,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 4,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 5,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 6,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 7,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 8,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 9,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 10,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 11,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 12,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 13,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 14,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 15,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 16,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 17,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 18,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 19,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 20,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 21,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 22,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 23,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 24,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 25,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 26,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 27,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 28,
			name: "HIPAA Complaince",
			category: "Healthcare",
			completionDate: "24-06-2024",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 29,
			name: "Course Name",
			category: "Technology",
			completionDate: "24-06-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 30,
			name: "Course",
			category: "Other",
			completionDate: "24-06-2024",
			credits: "180",
			buttonText: "View",
		},
	];

	const earnedData = [
		{
			id: 1,
			name: "Blockchain Basics",
			category: "Technology",
			completionDate: "12-04-2023",
			credits: "100",
			buttonText: "View",
		},
		{
			id: 2,
			name: "Digital Marketing",
			category: "Business",
			completionDate: "01-03-2024",
			credits: "200",
			buttonText: "View",
		},
		{
			id: 3,
			name: "Cybersecurity Essentials",
			category: "Technology",
			completionDate: "18-05-2023",
			credits: "120",
			buttonText: "View",
		},
		{
			id: 4,
			name: "Project Management",
			category: "Management",
			completionDate: "22-08-2024",
			credits: "150",
			buttonText: "View",
		},
		{
			id: 5,
			name: "Data Science",
			category: "Technology",
			completionDate: "30-11-2023",
			credits: "180",
			buttonText: "View",
		},
		{
			id: 5,
			name: "Data Science",
			category: "Technology",
			completionDate: "30-11-2023",
			credits: "180",
			buttonText: "View",
		},
	];

	const [earnedcurrentPage, setEarnedCurrentPage] = useState(1);
	const [externalCurrentPage, setExternalCurrentPage] = useState(1);
	const itemsPerPage = 5;

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
					<Tabs defaultValue="earnedCertificate">
						<div className="flex justify-between items-center px-5 mb-5">
							<TabsList className="flex gap-4 bg-white">
								<TabsTrigger
									value="earnedCertificate"
									className="!shadow-none text-lg p-0 data-[state=active]:underline data-[state=active]:underline-offset-8"
								>
									Certifications Earned
								</TabsTrigger>
								<TabsTrigger
									value="externalCertificate"
									className="!shadow-none text-lg p-0 data-[state=active]:underline data-[state=active]:underline-offset-8"
								>
									External Certifications
								</TabsTrigger>
							</TabsList>

							<TabsContent value="externalCertificate" className="mt-0">
								<Button className="w-40" type="submit">
									Upload Certificate
								</Button>
							</TabsContent>
						</div>
						<TabsContent value="earnedCertificate" className="mt-0">
							<AppTable
								headers={headers}
								data={data}
								itemsPerPage={itemsPerPage}
								currentPage={earnedcurrentPage}
								type="certifications"
							/>
							{data.length <= 5 ? null : (
								<TablePagination
									data={data}
									itemsPerPage={itemsPerPage}
									currentPage={earnedcurrentPage}
									setCurrentPage={setEarnedCurrentPage}
								/>
							)}
						</TabsContent>
						<TabsContent value="externalCertificate" className="mt-0">
							<AppTable
								headers={headers}
								data={externalData}
								itemsPerPage={itemsPerPage}
								currentPage={externalCurrentPage}
								type="certifications"
							/>
							<TablePagination
								data={externalData}
								itemsPerPage={itemsPerPage}
								currentPage={externalCurrentPage}
								setCurrentPage={setExternalCurrentPage}
							/>
						</TabsContent>
					</Tabs>
				</div>
			)}
		</>
	);
}
