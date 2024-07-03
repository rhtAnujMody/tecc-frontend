"use client";
import {
  FETCHUSER,
  SIGNUP,
  USERDATA,
  createAPIEndpoint,
} from "@/lib/constants";
import { getLocalData, setLocalData } from "@/lib/utils";
import { TUserContext, UserData } from "@/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import fetchApi from "@/lib/api";

export const UserContext = createContext<TUserContext | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<TUserContext>({
    user: undefined,
    updateUserData: () => { },
  });

  const callUserDataAPI = async () => {
    const response = await fetchApi<UserData, any>(
      createAPIEndpoint(FETCHUSER), { method: "GET" }
    );
    if (response.ok && response.data) {
      const userData = response.data;
      setLocalData(USERDATA, JSON.stringify(userData));
      updateUserData(userData);
    }
  };

  const updateUserData = (newUserData: UserData, callAPI: boolean = false) => {
    if (callAPI) {
      callUserDataAPI();
    } else {
      setUserData((prev) => ({ ...prev, user: newUserData }));
    }
  };
  useEffect(() => {
    updateUserData(JSON.parse(getLocalData(USERDATA)!));
  }, []);

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
