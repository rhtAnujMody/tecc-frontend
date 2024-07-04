"use client";
import {
  COMPLETED,
  COURSEDETAILINDEX,
  COURSESBYCATEGORY,
  ENROLLED,
  PENDING,
} from "@/lib/constants";
import { useEffect, useMemo, useRef, useState } from "react";
import AllCourses from "../components/AllCourses";
import CertificationsDashboard from "../components/CertificationsDashboard";
import NavigationHeader from "../components/NavigationHeader";
import CaseStudyParent from "../components/case-study/CaseStudyParent";
import CourseDetailsMain from "../components/course-details/CourseDetailMain";
import DashboardHome from "../components/dashboard/DashboardHome";
import KnowledgeBankParent from "../components/knowledge-bank/KnowledgeBankParent";
import { useSidebar } from "../context/SideBarContext";

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
      case 2:
        setMainHeader("Case Studies");
        break;
      case 3:
        setMainHeader("Knowledge Bank");
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

      case 5:
        return (
          <AllCourses
            onCourseClick={({ id: courseId, title }) => {
              openCourse(courseId!, title!);
            }}
            url={`${COURSESBYCATEGORY}${id.current}/`}
          />
        );

      case 10:
        return (
          <AllCourses
            url={`${ENROLLED}`}
            onCourseClick={({ id: courseId, title }) => {
              openCourse(courseId!, title!);
            }}
          />
        );

      case 11:
        return (
          <AllCourses
            url={PENDING}
            onCourseClick={({ id: courseId, title }) => {
              openCourse(courseId!, title!);
            }}
          />
        );

      case 12:
        return (
          <AllCourses
            url={COMPLETED}
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

  return (
    <main className="flex flex-col px-5 flex-1 my-5 overflow-auto">
      {(position === COURSEDETAILINDEX || position === 5) && (
        <NavigationHeader
          main={mainHeader}
          secondary={secondaryHeader}
          onClick={() => {
            setSecondaryHeader("");

            updateSideBar(
              data.map((item, pos) => {
                if (pos === 0) {
                  return { ...item, isSelected: true };
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
