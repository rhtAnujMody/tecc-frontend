import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { TContentData } from "@/types";
import AppTable from "./AppTable";
import TablePagination from "./TablePagination";

export default function TabContentData({
	data,
	headers,
	currentPage,
	type,
	setCurrentPage,
	tabValue,
}: TContentData) {
	return (
		<>
			<TabsContent value={tabValue} className="mt-0">
				{data.length === 0 ? (
					<div className="flex mt-10 justify-center text-lg font-bold">
						No certificates available
					</div>
				) : (
					<>
						<AppTable
							headers={headers}
							data={data}
							currentPage={currentPage}
							type={type}
						/>
						{data.length > 5 && (
							<TablePagination
								data={data}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
							/>
						)}
					</>
				)}
			</TabsContent>
		</>
	);
}
