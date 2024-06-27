"use client";
import {
	COMPLETED,
	COURSESBYCATEGORY,
	ENROLLED,
	PENDING,
	createAPIEndpoint,
} from "@/lib/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import AllCourses from "../components/AllCourses";
import CertificationsDashboard from "../components/CertificationsDashboard";
import NavigationHeader from "../components/NavigationHeader";
import CourseDetailsMain from "../components/course-details/CourseDetailMain";
import DashboardHome from "../components/dashboard/DashboardHome";
import { useSidebar } from "../context/SideBarContext";
import KnowledgeBankParent from "../components/knowledge-bank/KnowledgeBankParent";

export default function Dashboard() {
	const { position, data, updateSideBar } = useSidebar();
	const id = useRef("");
	const catImage = useRef("");
	const [mainHeader, setMainHeader] = useState("Dashboard");
	const [secondaryHeader, setSecondaryHeader] = useState("");

	useEffect(() => {
		switch (position) {
			case 0:
				setMainHeader("Home");
				break;
			case 10:
				setMainHeader("My Courses");
				break;
			case 11:
				setMainHeader("Pending Courses");
				break;
			case 12:
				setMainHeader("Completed Courses");
				break;
			case 13:
				setMainHeader("Certifications");
				break;
			case 2:
				setMainHeader("Case Studies");
				break;
			case 3:
				setMainHeader("Knowledge Bank");
				break;

			default:
				break;
		}
	}, [position]);

	const openCourse = (courseId: string, title: string) => {
		id.current = courseId!;
		setSecondaryHeader(title ?? "");
		updateSideBar(data, 6);
	};

	const getComponent = useMemo(() => {
		console.log(position);

		switch (position) {
			case 0:
				return (
					<DashboardHome
						onCategoryCardClick={({ id: courseId, thumbnail, title }) => {
							id.current = courseId!;
							catImage.current = thumbnail;
							setSecondaryHeader(title ?? "");
							updateSideBar(data, 5);
						}}
						onCourseClick={({ id: courseId, title }) => {
							openCourse(courseId!, title!);
						}}
					/>
					//
				);
			case 10:
				setSecondaryHeader("");
				return (
					<AllCourses
						url={createAPIEndpoint(`${ENROLLED}`)}
						onCourseClick={({ id: courseId, title }) => {
							openCourse(courseId!, title!);
						}}
					/>
				);

			case 11:
				setSecondaryHeader("");
				return (
					<AllCourses
						url={createAPIEndpoint(`${PENDING}`)}
						onCourseClick={({ id: courseId, title }) => {
							openCourse(courseId!, title!);
						}}
					/>
				);

			case 13:
				setSecondaryHeader("");
				return <CertificationsDashboard />;

			case 12:
				setSecondaryHeader("");
				return (
					<AllCourses
						url={createAPIEndpoint(`${COMPLETED}`)}
						onCourseClick={({ id: courseId, title }) => {
							openCourse(courseId!, title!);
						}}
					/>
				);

			case 5:
				return (
					<AllCourses
						url={createAPIEndpoint(`${COURSESBYCATEGORY}${id.current}/`)}
						onCourseClick={({ id: courseId, title }) => {
							openCourse(courseId!, title!);
						}}
					/>
				);
			case 6:
				return <CourseDetailsMain id={id.current} />;
			case 3:
				return <KnowledgeBankParent />;
		}
	}, [position]);

	return (
		<main className="flex flex-col px-5 flex-1 my-5 overflow-auto">
			{secondaryHeader != "" && (
				<NavigationHeader
					main={mainHeader}
					secondary={secondaryHeader}
					onClick={() => {
						setSecondaryHeader("");

						updateSideBar(
							data.map((data, pos) => {
								if (pos === 0) {
									return {
										...data,
										isSelected: true,
									};
								}
								return { ...data, isSelected: false };
							}),
							0
						);
					}}
				/>
			)}
			{getComponent}
		</main>
	);
}
