"use client";

import { ISideBar, SideBarItem } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";
import certificates from "../../../public/certificates.svg";
import completedCourses from "../../../public/completed-courses.svg";
import home from "../../../public/home.svg";
import myCourses from "../../../public/my-courses.svg";
import pendingCouses from "../../../public/pending-courses.svg";
import knowledgeBankIcon from "../../../public/KnowledgeBankIcon.svg";
import caseStudiesIcon from "../../../public/CaseStudiesIcon.svg";

export const SideBarContext = createContext<ISideBar | undefined>(undefined);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
	const sideBarItems: SideBarItem[] = [
		{
			header: "Home",
			isSelected: true,
			icon: home,
			subItems: null,
		},
		{
			header: "Courses",
			isSelected: false,
			icon: myCourses,
			subItems: [
				{
					header: "My Courses",
					isSelected: false,
					icon: myCourses,
				},
				{
					header: "Pending Courses",
					isSelected: false,
					icon: pendingCouses,
				},
				{
					header: "Completed Courses",
					isSelected: false,
					icon: completedCourses,
				},
				{
					header: "Certifications",
					isSelected: false,
					icon: certificates,
				},
			],
		},
		{
			header: "Case Studies",
			isSelected: false,
			icon: caseStudiesIcon,
			subItems: null,
		},
		{
			header: "Knowledge Bank",
			isSelected: false,
			icon: knowledgeBankIcon,
			subItems: null,
		},
	];
	const [sideBarData, setSideBarData] = useState<ISideBar>({
		data: sideBarItems,
		position: 0,
		updateSideBar: () => {},
	});

	const updateSideBar = (newData: SideBarItem[], newPos: number) => {
		setSideBarData((prev) => ({ ...prev, data: newData, position: newPos }));
	};
	return (
		<SideBarContext.Provider value={{ ...sideBarData, updateSideBar }}>
			{children}
		</SideBarContext.Provider>
	);
};

export const useSidebar = () => {
	const context = useContext(SideBarContext);
	if (context === undefined) {
		throw new Error("useSidebar must be used within a SidebarProvider");
	}
	return context;
};
