"use client";
import React from "react";
import { useSidebar } from "../context/SideBarContext";
import Course from "../components/Course";
import Section from "../components/dashboard/Section";

export default function Dashboard() {
  const { position } = useSidebar();
  return (
    <main className="flex flex-col px-5 gap-10 overflow-x-auto">
      <Section />
      <Section />
      <Section />
      <Section />
      <Section />
    </main>
  );
}
