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

export default function Dashboard() {
  const { position, data, updateSideBar } = useSidebar();
  const id = useRef("");
  const catImage = useRef("");
  const [mainHeader, setMainHeader] = useState("Dashboard");
  const [secondaryHeader, setSecondaryHeader] = useState("");

  useEffect(() => {
    switch (position) {
      case 0:
        setMainHeader("Dashboard");
        break;
      case 1:
        setMainHeader("My Courses");
        break;
      case 2:
        setMainHeader("Peding Courses");
        break;
      case 3:
        setMainHeader("Courses Courses");
        break;
      case 4:
        setMainHeader("Certifications");
        break;

      default:
        break;
    }
  }, [position]);

  const getComponent = useMemo(() => {
    switch (position) {
      case 0:
        return (
          <DashboardHome
            onClick={(courseId, title, thumbnail) => {
              id.current = courseId;
              catImage.current = thumbnail;
              setSecondaryHeader(title);
              updateSideBar(data, 5);
            }}
          />
        );
      case 1:
        setSecondaryHeader("");
        return <AllCourses url={createAPIEndpoint(`${ENROLLED}`)} />;

      case 2:
        setSecondaryHeader("");
        return <AllCourses url={createAPIEndpoint(`${PENDING}`)} />;

      case 3:
        setSecondaryHeader("");
        return <AllCourses url={createAPIEndpoint(`${COMPLETED}`)} />;

      case 5:
        return (
          <AllCourses
            url={createAPIEndpoint(`${COURSESBYCATEGORY}${id.current}/`)}
          />
        );
    }
  }, [position]);

  console.log("Dashboard");
  return (
    <main className="flex flex-col px-5 flex-1 mb-5 overflow-auto">
      <NavigationHeader
        main={mainHeader}
        secondary={secondaryHeader}
        onClick={() => {
          setSecondaryHeader("");
          updateSideBar(data, 0);
        }}
      />
      {getComponent}
    </main>
  );
}
