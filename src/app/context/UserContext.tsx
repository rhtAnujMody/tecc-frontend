"use client";
import { USERDATA } from "@/lib/constants";
import { getLocalData } from "@/lib/utils";
import { TUserContext, UserData } from "@/types";
import { cookies } from "next/headers";
import { ReactNode, createContext, useContext, useState } from "react";

export const UserContext = createContext<TUserContext | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<TUserContext>({
    user: JSON.parse(getLocalData(USERDATA) ?? ""),
    updateUserData: () => {},
  });

  const updateUserData = (newUserData: UserData) => {
    setUserData((prev) => ({ ...prev, user: newUserData }));
  };

  return (
    <UserContext.Provider value={{ ...userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("error");
  }
  return context;
};
