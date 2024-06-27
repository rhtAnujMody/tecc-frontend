import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import certificate from "../../../public/miniCertificate.svg";
import trophy from "../../../public/credit.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import download from "../../../public/download.svg";
import { TAppTable, TCertifications } from "@/types";

export default function AppTable({
	headers,
	data,
	currentPage,
	itemsPerPage,
	type,
}: TAppTable) {
	const currentData = (data as TCertifications[]).slice(
		(currentPage - 1) * itemsPerPage || 0,
		currentPage * itemsPerPage
	);

	const dataWithImage = (name: string, imageUrl: string, size: number) => {
		return (
			<TableCell className="text-sm font-medium text-text-primary">
				<div className="flex items-center gap-2">
					<Image
						src={imageUrl}
						alt="image"
						width={size}
						height={size}
						priority={false}
					/>
					{name}
				</div>
			</TableCell>
		);
	};

	const buttonWithText = (text: string, imageUrl: string, size: number) => {
		return (
			<TableCell>
				<div className="flex items-center gap-5">
					<Button className="w-24" type="submit">
						{text}
					</Button>
					<Image
						src={imageUrl}
						alt="image"
						width={size}
						height={size}
						priority={false}
					/>
				</div>
			</TableCell>
		);
	};

	const certificationCells = (row: TCertifications) => {
		const formattedDate = row.completion_date
			? new Date(row.completion_date).toLocaleDateString()
			: "N/A";

		const driveUrl = row.certification_url
			? `https://drive.google.com/viewerng/viewer?url=${encodeURIComponent(
					row.certification_url
			  )}`
			: "#";
		return (
			<>
				<TableCell className="text-sm font-medium text-text-primary">
					<div className="flex items-center gap-2">
						<Image
							src={certificate}
							alt="image"
							width={50}
							height={50}
							priority={false}
						/>
						{row.course_name}
					</div>
				</TableCell>
				<TableCell className="text-sm font-medium text-text-primary">
					{row.course_category}
				</TableCell>
				<TableCell className="text-sm font-medium text-text-primary">
					{formattedDate}
				</TableCell>
				<TableCell className="text-sm font-medium text-text-primary">
					<div className="flex items-center gap-2">
						<Image
							src={trophy}
							alt="image"
							width={20}
							height={20}
							priority={false}
						/>
						{row.credits_earned}
					</div>
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-5">
						<a href={driveUrl} target="_blank">
							<Button className="w-24" type="submit">
								View
							</Button>
						</a>

						<Image
							src={download}
							alt="image"
							width={20}
							height={20}
							priority={false}
						/>
					</div>
				</TableCell>
			</>
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
						{type === "certifications"
							? certificationCells(row)
							: Object.entries(row).map(([key, value], i) => (
									<TableCell
										key={key}
										className="text-sm font-medium text-text-primary"
									>
										{value}
									</TableCell>
							  ))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
