"use client";
import {
  COMPLETED,
  COURSEDETAILINDEX,
  COURSESBYCATEGORY,
  ENROLLED,
  PENDING,
  createAPIEndpoint,
} from "@/lib/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import AllCourses from "../components/AllCourses";
import NavigationHeader from "../components/NavigationHeader";
import CaseStudyParent from "../components/case-study/CaseStudyParent";
import CourseDetailsMain from "../components/course-details/CourseDetailMain";
import DashboardHome from "../components/dashboard/DashboardHome";
import KnowledgeBankParent from "../components/knowledge-bank/KnowledgeBankParent";
import { useSidebar } from "../context/SideBarContext";
import CertificationsDashboard from "../components/CertificationsDashboard";

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
    updateSideBar(data, COURSEDETAILINDEX);
  };

  const handleOnTopCardClick = (index: number) => {
    switch (index) {
      case 0:
        updateSideBar(data, 3);
        break;
      case 1:
        updateSideBar(data, 2);
        break;
      case 2:
        updateSideBar(data, 13);
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

      case 10:
        return (
          <AllCourses
            url={createAPIEndpoint(`${ENROLLED}`)}
            onCourseClick={({ id: courseId, title }) => {
              openCourse(courseId!, title!);
            }}
          />
        );

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
    }
  }, [position]);

  return (
    <main className="flex flex-col px-5 flex-1 my-5 overflow-auto">
      {position === COURSEDETAILINDEX && (
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
