"use client";
import {
<<<<<<< HEAD
	COMPLETED,
	COURSEDETAILINDEX,
	ENROLLED,
	PENDING,
	createAPIEndpoint,
=======
  COMPLETED,
  COURSEDETAILINDEX,
  COURSESBYCATEGORY,
  ENROLLED,
  PENDING,
  createAPIEndpoint,
>>>>>>> 623828f0757c0126ec7ac5b3426df12a344777a4
} from "@/lib/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import AllCourses from "../components/AllCourses";
import CertificationsDashboard from "../components/CertificationsDashboard";
import NavigationHeader from "../components/NavigationHeader";
import CaseStudyParent from "../components/case-study/CaseStudyParent";
import DashboardHome from "../components/dashboard/DashboardHome";
import KnowledgeBankParent from "../components/knowledge-bank/KnowledgeBankParent";
import { useSidebar } from "../context/SideBarContext";
import CourseDetailsMain from "../components/course-details/CourseDetailMain";

export default function Dashboard() {
	const { position, data, updateSideBar } = useSidebar();
	const id = useRef("");
	const catImage = useRef("");
	const [mainHeader, setMainHeader] = useState("Dashboard");
	const [secondaryHeader, setSecondaryHeader] = useState("");

<<<<<<< HEAD
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
=======
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
>>>>>>> 623828f0757c0126ec7ac5b3426df12a344777a4

			default:
				break;
		}
	}, [position]);

	const openCourse = (courseId: string, title: string) => {
		id.current = courseId!;
		setSecondaryHeader(title ?? "");
		updateSideBar(data, COURSEDETAILINDEX);
	};

	const handleOnTopCardClick = (index: number) => {
		const newData = data.map((item, pos) => {
			if ((index === 0 && pos === 3) || (index === 1 && pos === 2)) {
				return { ...item, isSelected: true };
			} else if (pos === 1 && index == 2) {
				return {
					...item,
					isSelected: true,
					subItems:
						item.subItems?.map((subItem, subPos) => {
							return {
								...subItem,
								isSelected: subPos === 3,
							};
						}) || null,
				};
			}
			return {
				...item,
				isSelected: false,
				subItems:
					item.subItems?.map((subItem) => ({
						...subItem,
						isSelected: false,
					})) || null,
			};
		});
		switch (index) {
			case 0:
				updateSideBar(newData, 3);
				break;
			case 1:
				updateSideBar(newData, 2);
				break;
			case 2:
				updateSideBar(newData, 13);
				break;

			default:
				break;
		}
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
						onTopCardsClick={handleOnTopCardClick}
					/>
				);
			case 2:
				return <CaseStudyParent />;
			case 3:
				return <KnowledgeBankParent />;

<<<<<<< HEAD
			case 10:
				return (
					<AllCourses
						url={createAPIEndpoint(`${ENROLLED}`)}
						onCourseClick={({ id: courseId, title }) => {
							openCourse(courseId!, title!);
						}}
					/>
				);
=======
      case 5:
        return (
          <AllCourses
            onCourseClick={({ id: courseId, title }) => {
              openCourse(courseId!, title!);
            }}
            url={createAPIEndpoint(`${COURSESBYCATEGORY}${id.current}/`)}
          />
        );

      case 10:
        return (
          <AllCourses
            url={createAPIEndpoint(`${ENROLLED}`)}
            onCourseClick={({ id: courseId, title }) => {
              openCourse(courseId!, title!);
            }}
          />
        );
>>>>>>> 623828f0757c0126ec7ac5b3426df12a344777a4

			case 11:
				return (
					<AllCourses
						url={createAPIEndpoint(`${PENDING}`)}
						onCourseClick={({ id: courseId, title }) => {
							openCourse(courseId!, title!);
						}}
					/>
				);

			case 12:
				return (
					<AllCourses
						url={createAPIEndpoint(`${COMPLETED}`)}
						onCourseClick={({ id: courseId, title }) => {
							openCourse(courseId!, title!);
						}}
					/>
				);
			case 13:
				return <CertificationsDashboard />;

			case COURSEDETAILINDEX:
				return <CourseDetailsMain id={id.current} />;
		}
	}, [position]);

<<<<<<< HEAD
	return (
		<main className="flex flex-col px-5 flex-1 my-5 overflow-auto">
			{position === COURSEDETAILINDEX && (
				<NavigationHeader
					main={mainHeader}
					secondary={secondaryHeader}
					onClick={() => {
						setSecondaryHeader("");
=======
  return (
    <main className="flex flex-col px-5 flex-1 my-5 overflow-auto">
      {(position === COURSEDETAILINDEX || position === 5) && (
        <NavigationHeader
          main={mainHeader}
          secondary={secondaryHeader}
          onClick={() => {
            setSecondaryHeader("");
>>>>>>> 623828f0757c0126ec7ac5b3426df12a344777a4

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
