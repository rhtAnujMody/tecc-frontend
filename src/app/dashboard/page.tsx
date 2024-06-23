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
import NavigationHeader from "../components/NavigationHeader";
import DashboardHome from "../components/dashboard/DashboardHome";
import { useSidebar } from "../context/SideBarContext";
import CourseDetails from "../course/[courseId]/page";

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
      case 1:
        setMainHeader("My Courses");
        break;
      case 2:
        setMainHeader("Peding Courses");
        break;
      case 3:
        setMainHeader("Completed Courses");
        break;
      case 4:
        setMainHeader("Certifications");
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
      case 1:
        setSecondaryHeader("");
        return (
          <AllCourses
            url={createAPIEndpoint(`${ENROLLED}`)}
            onCourseClick={({ id: courseId, title }) => {
              openCourse(courseId!, title!);
            }}
          />
        );

      case 2:
        setSecondaryHeader("");
        return (
          <AllCourses
            url={createAPIEndpoint(`${PENDING}`)}
            onCourseClick={({ id: courseId, title }) => {
              openCourse(courseId!, title!);
            }}
          />
        );

      case 3:
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
        return <CourseDetails id={id.current} />;
    }
  }, [position]);

  console.log("Dashboard");
  return (
    <main className="flex flex-col px-5 flex-1 my-5 overflow-auto">
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
      {getComponent}
    </main>
  );
}
