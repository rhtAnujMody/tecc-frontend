"use client";
import React from "react";
import { useSidebar } from "../context/SideBarContext";

export default function Dashboard() {
  const { position } = useSidebar();
  return <main>{position}</main>;
}
