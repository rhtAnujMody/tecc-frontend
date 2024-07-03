"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";
export const SWRProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SWRConfig value={{ shouldRetryOnError: false, errorRetryCount: 0 }}>
      {children}
    </SWRConfig>
  );
};
