"use client";

import { Suspense } from "react";
import Home from "./components/landing/LandingParent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Home />
    </Suspense>
  );
}
